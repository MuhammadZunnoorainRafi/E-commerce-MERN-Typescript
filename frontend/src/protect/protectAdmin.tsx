import { useAppSelector } from '../hooks/RTKHooks';
import ErrorAdmin from '../pages/(admin)/ErrorAdmin';

function ProtectAdmin({ children }: { children: React.ReactNode }) {
  const { user } = useAppSelector((state) => state.authReducer);
  if (user?.isAdmin) {
    return children;
  } else {
    return <ErrorAdmin />;
  }
}

export default ProtectAdmin;
