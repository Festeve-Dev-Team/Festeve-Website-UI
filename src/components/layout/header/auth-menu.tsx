import Link from '@components/ui/link';
import { useTranslation } from 'next-i18next';
import { FaChevronDown } from 'react-icons/fa';
import { useLogoutMutation } from '@framework/auth/use-logout';
import { useRouter } from 'next/router';
import { useUI } from '@contexts/ui.context';
import { showToast } from '@utils/toast';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

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
	const [isHovered, setIsHovered] = useState(false);

	const filteredMenuItems = authMenuItems.filter(item =>
		(isAuthorized && item.authorized) || (!isAuthorized && !item.authorized)
	);

	// Extract GIF and text from children
	const childrenArray = Array.isArray(children) ? children : [children];
	const gifElement = childrenArray.find((child: any) => child?.type === 'img');
	const textElement = childrenArray.find((child: any) => typeof child === 'string');

	return (
		<div
			className="relative group"
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
		>
			{isAuthorized ? (
				<div className={`${className} flex items-center justify-center gap-1.5 cursor-pointer py-2 hover:text-black transition-colors duration-200`}>
					<div className="relative flex items-center justify-center min-h-[48px] w-[50px]">
						<AnimatePresence mode="wait">
							{isHovered ? (
								<motion.div
									key="gif"
									initial={{ opacity: 0, scale: 0.8 }}
									animate={{ opacity: 1, scale: 1 }}
									exit={{ opacity: 0, scale: 0.8 }}
									transition={{ duration: 0.2, ease: "easeInOut" }}
									className="flex items-center justify-center absolute inset-0"
								>
									{gifElement}
								</motion.div>
							) : (
								<motion.div
									key="text"
									initial={{ opacity: 0, y: 5 }}
									animate={{ opacity: 1, y: 0 }}
									exit={{ opacity: 0, y: -5 }}
									transition={{ duration: 0.2, ease: "easeInOut" }}
									className="flex items-center justify-center absolute inset-0"
								>
									{textElement}
								</motion.div>
							)}
						</AnimatePresence>
					</div>
					<motion.span
						className="flex items-center justify-center w-4 h-4"
						animate={{ rotate: isHovered ? -180 : 0 }}
						transition={{ duration: 0.3, ease: "easeInOut" }}
					>
						<FaChevronDown className="w-3 h-3 transition duration-200 ease-in-out transform" />
					</motion.span>
				</div>
			) : (
				<button {...btnProps} className={`${className} flex items-center justify-center gap-1.5 py-2 hover:text-black transition-colors duration-200`}>
					<div className="relative flex items-center justify-center min-h-[48px] w-[50px]">
						<AnimatePresence mode="wait">
							{isHovered ? (
								<motion.div
									key="gif"
									initial={{ opacity: 0, scale: 0.8 }}
									animate={{ opacity: 1, scale: 1 }}
									exit={{ opacity: 0, scale: 0.8 }}
									transition={{ duration: 0.2, ease: "easeInOut" }}
									className="flex items-center justify-center absolute inset-0"
								>
									{gifElement}
								</motion.div>
							) : (
								<motion.div
									key="text"
									initial={{ opacity: 0, y: 5 }}
									animate={{ opacity: 1, y: 0 }}
									exit={{ opacity: 0, y: -5 }}
									transition={{ duration: 0.2, ease: "easeInOut" }}
									className="flex items-center justify-center absolute inset-0"
								>
									{textElement}
								</motion.div>
							)}
						</AnimatePresence>
					</div>
					<motion.span
						className="flex items-center justify-center w-4 h-4"
						animate={{ rotate: isHovered ? -180 : 0 }}
						transition={{ duration: 0.3, ease: "easeInOut" }}
					>
						<FaChevronDown className="w-3 h-3 transition duration-200 ease-in-out transform" />
					</motion.span>
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
