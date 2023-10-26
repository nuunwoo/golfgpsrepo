import { AdminPage } from '@pkg/page';
import { AdminProps } from '@pkg/types';

const Admin = ({ url, isSide, setIsSide }: AdminProps) => {
  return (
    <AdminPage
      url={url}
      isSide={isSide}
      setIsSide={setIsSide}
    />
  );
};

export default Admin;
