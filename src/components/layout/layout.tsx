import { NextSeo } from 'next-seo';
import Header from '@components/layout/header/header';
import Footer from '@components/layout/footer/footer';
import MobileNavigation from '@components/layout/mobile-navigation/mobile-navigation';
import Search from '@components/common/search';
import CookieBar from '@components/common/cookie-bar';
import { useAcceptCookies } from '@utils/use-accept-cookies';
import Button from '@components/ui/button';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import Spinner from '@components/ui/loaders/spinner';

export default function Layout({ children }: React.PropsWithChildren<{}>) {
	const { acceptedCookies, onAcceptCookies } = useAcceptCookies();
	const { t } = useTranslation('common');
	const router = useRouter();
	const [isLoading, setIsLoading] = useState(true);

	const isAuthPage = router.pathname === '/signup' || router.pathname === '/signin';

	useEffect(() => {
		// Simple timeout to allow components to initialize
		const timer = setTimeout(() => {
			setIsLoading(false);
		}, 1500); // 1.5 seconds should be enough for most components

		return () => clearTimeout(timer);
	}, [router.pathname]); // Reset loading on route change

	// Show loading screen while components are initializing
	if (isLoading && !isAuthPage) {
		return (
			<div className="flex flex-col min-h-screen">
				<NextSeo
					additionalMetaTags={[
						{
							name: 'viewport',
							content: 'width=device-width, initial-scale=1.0',
						},
					]}
					title="Festeve React - React Next E-commerce Template"
					description="Fastest E-commerce template built with React, NextJS, TypeScript, @tanstack/react-query and Tailwind CSS."
					canonical="https://festeve.vercel.app/"
					openGraph={{
						url: 'https://festeve.vercel.app',
						title: 'Festeve React - React Next E-commerce Template',
						description:
							'Fastest E-commerce template built with React, NextJS, TypeScript, @tanstack/react-query and Tailwind CSS.',
						images: [
							{
								url: '/assets/images/og-image-01.png',
								width: 800,
								height: 600,
								alt: 'Og Image Alt',
							},
							{
								url: '/assets/images/og-image-02.png',
								width: 900,
								height: 800,
								alt: 'Og Image Alt Second',
							},
						],
					}}
				/>
				<div className="flex items-center justify-center min-h-screen bg-white">
					<div className="text-center">
						<img src="/assets/icons/loading.gif" alt="logo" className="w-24 h-24 mx-auto" />
						<p className="mt-4 text-sm text-gray-600">Please wait while we prepare everything for you</p>
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className="flex flex-col min-h-screen">
			<NextSeo
				additionalMetaTags={[
					{
						name: 'viewport',
						content: 'width=device-width, initial-scale=1.0',
					},
				]}
				title="Festeve React - React Next E-commerce Template"
				description="Fastest E-commerce template built with React, NextJS, TypeScript, @tanstack/react-query and Tailwind CSS."
				canonical="https://festeve.vercel.app/"
				openGraph={{
					url: 'https://festeve.vercel.app',
					title: 'Festeve React - React Next E-commerce Template',
					description:
						'Fastest E-commerce template built with React, NextJS, TypeScript, @tanstack/react-query and Tailwind CSS.',
					images: [
						{
							url: '/assets/images/og-image-01.png',
							width: 800,
							height: 600,
							alt: 'Og Image Alt',
						},
						{
							url: '/assets/images/og-image-02.png',
							width: 900,
							height: 800,
							alt: 'Og Image Alt Second',
						},
					],
				}}
			/>
			{!isAuthPage && <Header />}
			<main
				className="relative flex-grow"
				style={{
					minHeight: '-webkit-fill-available',
					WebkitOverflowScrolling: 'touch',
				}}
			>
				{children}
			</main>
			{!isAuthPage && <Footer />}
			{!isAuthPage && <MobileNavigation />}
			{!isAuthPage && <Search />}
			<CookieBar
				title={t('text-cookies-title')}
				hide={acceptedCookies}
				action={
					<Button onClick={() => onAcceptCookies()} variant="slim">
						{/* @ts-ignore */}
						{t('text-accept-cookies')}
					</Button>
				}
			/>
		</div>
	);
}
