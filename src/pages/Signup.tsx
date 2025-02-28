
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';
import { useAuth } from '@/lib/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { signUp } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // For the demo, just use any email/password and redirect
      // In a real app, this would register with Supabase
      // const { error } = await signUp(email, password, name);
      
      // if (error) {
      //   toast({
      //     title: 'Error',
      //     description: error.message,
      //     variant: 'destructive',
      //   });
      //   return;
      // }

      // For the demo, just simulate a successful signup
      setTimeout(() => {
        toast({
          title: 'Account created!',
          description: 'Your account has been successfully created.',
        });
        
        navigate('/');
      }, 1000);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'An unexpected error occurred.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-tagalong-gray">
      <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-md">
        <div className="text-center mb-8">
          <Link to="/" className="inline-block">
            <div className="flex items-center gap-2 text-2xl font-bold">
              <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16 4.5C16 5.88071 14.8807 7 13.5 7C12.1193 7 11 5.88071 11 4.5C11 3.11929 12.1193 2 13.5 2C14.8807 2 16 3.11929 16 4.5Z" fill="#9b87f5"/>
                <path d="M9 6L9 19M9 19H7M9 19H12M14 16L17 22L22 15" stroke="#9b87f5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M6 6L3 9L6 12" stroke="#9b87f5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-tagalong-purple to-tagalong-teal">
                TagAlong
              </span>
            </div>
          </Link>
          <h1 className="text-2xl font-bold mt-4">Create an account</h1>
          <p className="text-gray-600 mt-2">Join TagAlong and start riding together</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              type="text"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="rounded-xl"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="your.email@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="rounded-xl"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="rounded-xl"
            />
            <p className="text-xs text-gray-500">
              Password must be at least 8 characters long.
            </p>
          </div>

          <Button 
            type="submit" 
            className="w-full bg-tagalong-purple hover:bg-tagalong-purple-dark text-white rounded-full tagalong-button"
            disabled={isLoading}
          >
            {isLoading ? 'Creating account...' : 'Create account'}
          </Button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="text-tagalong-purple hover:underline font-medium">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
