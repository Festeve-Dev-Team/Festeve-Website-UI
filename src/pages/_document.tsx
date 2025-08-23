import Document, {
	Html,
	Head,
	Main,
	NextScript,
	DocumentContext,
} from "next/document";
import { i18n } from "next-i18next";
import { getDirection } from "@utils/get-direction";

export default class CustomDocument extends Document {
	static async getInitialProps(ctx: DocumentContext) {
		return await Document.getInitialProps(ctx);
	}
	render() {
		const { locale } = this.props.__NEXT_DATA__;
		if (process.env.NODE_ENV !== "production") {
			i18n!.reloadResources(locale);
		}
		return (
			<Html dir={getDirection(locale)}>
				<Head>
					{/* Google Analytics */}
					<script
						async
						src="https://www.googletagmanager.com/gtag/js?id=G-ESQ4M6J2P5"
					/>
					<script
						dangerouslySetInnerHTML={{
							__html: `
								window.dataLayer = window.dataLayer || [];
								function gtag(){dataLayer.push(arguments);}
								gtag('js', new Date());
								gtag('config', 'G-ESQ4M6J2P5');
							`,
						}}
					/>

					{/* Microsoft Clarity */}
					<script
						dangerouslySetInnerHTML={{
							__html: `
								(function(c,l,a,r,i,t,y){
									c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
									t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
									y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
								})(window, document, "clarity", "script", "sz506to47n");
							`,
						}}
					/>
				</Head>
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}
