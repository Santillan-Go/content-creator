import GetSession from "@/components/GetSession";
import AdminPage from "@/pages/Admin_Page";

export default function AdminPageAccess() {
  return <GetSession children={<AdminPage />} />;
}
