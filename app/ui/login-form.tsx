
import { lusitana } from '@/app/ui/fonts';
import { signIn } from '@/auth';
import Image from 'next/image';

 
export default function LoginForm() {
  return (
    <form 
      action={async () => {
        "use server"
        await signIn("google")
      }} 
      className="space-y-3">
      <div className="flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8">
        <h1 className={`${lusitana.className} mb-3 text-2xl`}>
          Please log in to continue
        </h1>
        <div className='flex items-center justify-center my-4'>
          <button 
            type="submit" 
            className="px-4 py-2 border flex gap-2 bg-white border-slate-200 rounded-lg hover:border-slate-400 hover:text-slate-600 hover:shadow transition duration-150">
            <Image src='/google-logo.svg' width='22' height='22' alt='google logo' className='rounded-2xl'/>
            <span>Signin with Google</span>
          </button>
        </div>
      </div>
      
    </form>
  );
}