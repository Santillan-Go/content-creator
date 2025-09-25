import GetSession from "@/components/GetSession";
import Header from "@/components/ui/Header";

export default function CreatorsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-gray-50 min-h-screen">
      <GetSession>{children}</GetSession>
    </div>
  );
}
