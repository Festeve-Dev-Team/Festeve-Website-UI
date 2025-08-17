import Link from '@components/ui/link';
import { useTranslation } from 'next-i18next';
import { FaChevronDown } from 'react-icons/fa';
import { useLogoutMutation } from '@framework/auth/use-logout';
import { useRouter } from 'next/router';
import { useUI } from '@contexts/ui.context';
import { showToast } from '@utils/toast';

interface Props {
	href: string;
	className?: string;
	btnProps: React.ButtonHTMLAttributes<any>;
	isAuthorized: boolean;
}

const authMenuItems = [
	{
		id: 1,
		path: '/my-account/account-details',
		label: 'menu-my-account',
		authorized: true
	},
	{
		id: 2,
		path: '/signin',
		label: 'menu-sign-in',
		authorized: false
	},
	{
		id: 3,
		path: '/signup',
		label: 'menu-sign-up',
		authorized: false
	},
	{
		id: 4,
		path: '/logout',
		label: 'menu-logout',
		authorized: true
	}
];

export default function AuthMenu({
	isAuthorized,
	className,
	btnProps,
	children,
}: React.PropsWithChildren<Props>) {
	const { t } = useTranslation('menu');
	const { unauthorize } = useUI();
	const router = useRouter();
	const { mutate: logout, isPending } = useLogoutMutation();

	const filteredMenuItems = authMenuItems.filter(item => 
		(isAuthorized && item.authorized) || (!isAuthorized && !item.authorized)
	);

	return (
		<div className="relative group">
			{isAuthorized ? (
				<div className={`${className} flex items-center justify-center gap-1.5 cursor-pointer py-2 hover:text-black transition-colors duration-200`}>
					<span>{children}</span>
					<span className="flex items-center justify-center w-4 h-4">
						<FaChevronDown className="w-3 h-3 transition duration-200 ease-in-out transform group-hover:-rotate-180" />
					</span>
				</div>
			) : (
				<button {...btnProps} className={`${className} flex items-center justify-center gap-1.5 py-2 hover:text-black transition-colors duration-200`}>
					<span>{children}</span>
					<span className="flex items-center justify-center w-4 h-4">
						<FaChevronDown className="w-3 h-3 transition duration-200 ease-in-out transform group-hover:-rotate-180" />
					</span>
				</button>
			)}

			<div className="absolute invisible bg-white opacity-0 group-hover:visible shadow-deep transition-all duration-300 ease-in-out -left-2 top-[120%] group-hover:top-full group-hover:opacity-100 z-30 min-w-[240px] rounded-md">
				<div className="absolute top-0 left-4 -mt-2.5 h-0 w-0 border-transparent border-l-[10px] border-r-[10px] border-b-[12px] border-b-white"></div>
				<ul className="py-3 text-sm text-body">
					{filteredMenuItems.map(item => (
						<li key={item.id} className="relative">
							{item.path === '/logout' ? (
								<Link
									href="#"
									className={`flex items-center px-6 py-3 text-sm text-heading hover:text-black hover:bg-gray-50 transition-all duration-200 ${isPending ? 'opacity-75 cursor-not-allowed pointer-events-none' : ''}`}
									onClick={(e) => {
										e.preventDefault();
										if (!isPending) {
											logout();
											unauthorize();
											router.push('/');
											showToast('Logged out successfully');
										}
									}}
								>
									<span className="w-full">{isPending ? 'Logging out...' : t(item.label)}</span>
								</Link>
							) : (
								<Link
									href={item.path}
									className="flex items-center px-6 py-3 text-sm text-heading hover:text-black hover:bg-gray-50 transition-all duration-200"
								>
									<span className="w-full">{t(item.label)}</span>
								</Link>
							)}
						</li>
					))}
				</ul>
			</div>
		</div>
	);
}
