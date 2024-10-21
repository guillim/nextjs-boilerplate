import SideNav from '@/app/ui/dashboard/sidenav';
import Breadcrumbs from '../ui/breadcrumbs';
 
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
      <div className="w-full flex-none md:w-64">
        <SideNav />
      </div>
      <div className="flex-grow md:overflow-y-auto md:p-4">
        <Breadcrumbs />
        {children}
      </div>
    </div>
  );
}