import { useUI } from "@contexts/ui.context";
import Modal from "./modal";
import dynamic from "next/dynamic";
import Newsletter from "../newsletter";
const LoginForm = dynamic(() => import("@components/auth/login-form"));
const SignUpForm = dynamic(() => import("@components/auth/sign-up-form"));
const ForgetPasswordForm = dynamic(
	() => import("@components/auth/forget-password-form")
);
const ProductPopup = dynamic(() => import("@components/product/product-popup"));
const NewsletterConfirm = dynamic(() => import("@components/common/newsletter-confirm"));
const CalendarModal = dynamic(() => import("@components/calendar/calendar-modal"));
interface SubscriptionData {
	email?: string;
	token?: string;
	onConfirm?: () => void;
}

const ManagedModal: React.FC = () => {
	const { displayModal, closeModal, modalView, modalData } = useUI();
	const subscriptionData = modalData as SubscriptionData;
	return (
		<Modal open={displayModal} onClose={closeModal}>
			{modalView === "LOGIN_VIEW" && <LoginForm />}
			{modalView === "SIGN_UP_VIEW" && <SignUpForm />}
			{modalView === "FORGET_PASSWORD" && <ForgetPasswordForm />}
			{modalView === "PRODUCT_VIEW" && <ProductPopup />}
			{modalView === "CALENDAR_VIEW" && <CalendarModal />}
			{modalView === "NEWSLETTER_VIEW" && <Newsletter />}
			{modalView === "NEWSLETTER_CONFIRM_VIEW" && subscriptionData && (
				<NewsletterConfirm
					email={subscriptionData.email || ""}
					onConfirm={() => subscriptionData.onConfirm?.()}
				/>
			)}
		</Modal>
	);
};

export default ManagedModal;
