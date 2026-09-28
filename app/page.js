import AuthForm from '@/components/AuthForm';

export const metadata = {
  title: 'Bantrab — Sign up or log in',
};

export default function SignInPage() {
  return <AuthForm mode="signin" />;
}
