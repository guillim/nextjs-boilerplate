import { lusitana } from '@/app/ui/fonts';
import { GetUserByEmail } from '../../user/use-case';
 
export default async function Page() {
  // const revenue = await fetchRevenue();
  // const user = await new GetUser().getUserById('410544b2-4001-4271-9855-fec4b6a6442a');
  const user = await new GetUserByEmail().getUserByEmail('test@test.test');
  await new Promise((resolve) => setTimeout( x => resolve(x), 2000));

  console.log(user);
  return (
    <main>
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Dashboard {user?.props.email}
      </h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {/* <Card title="Collected" value={totalPaidInvoices} type="collected" /> */}
        {/* <Card title="Pending" value={totalPendingInvoices} type="pending" /> */}
        {/* <Card title="Total Invoices" value={numberOfInvoices} type="invoices" /> */}
        {/* <Card
          title="Total Customers"
          value={numberOfCustomers}
          type="customers"
        /> */}
      </div>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
        {/* <RevenueChart revenue={revenue} /> */}
        {/* <LatestInvoices latestInvoices={latestInvoices} /> */}
      </div>
    </main>
  );
}