import { CreateUser } from '../../domain/user/use-case';

export async function GET() {
  try {
    await new CreateUser().createUser({
      name: 'John Doe',
      email: 'test2@test.test',
      password: 'password',
    });

    return new Response(JSON.stringify({ message: 'Users created successfuly' }), { status: 200 });
  } catch (error) {
    console.error('Error during seeding:', error);
    return new Response(JSON.stringify({ error }), { status: 500 });
  }
}