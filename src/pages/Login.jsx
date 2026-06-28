import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Cpu, Eye, EyeOff, Mail, Lock, Smartphone, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Checkbox } from '../components/ui/checkbox';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue
} from '../components/ui/select';
import { toast } from 'sonner';
import { Toaster } from '../components/ui/sonner';
import { branches } from '../data/branches';

export default function Login() {
  const navigate = useNavigate();
  const [showPwd, setShowPwd] = useState(false);
  const [email, setEmail] = useState('admin@ghazacomputer.ae');
  const [password, setPassword] = useState('demo1234');
  const [branch, setBranch] = useState(branches[0].id);
  const [loading, setLoading] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      toast.success('Welcome back, Admin!', { description: 'Redirecting to dashboard...' });
      setLoading(false);
      navigate('/dashboard');
    }, 600);
  };

  return (
    <div className="min-h-screen flex bg-[#071635]">
      {/* Left: Branding / Hero */}
      <div className="hidden lg:flex lg:w-[55%] relative overflow-hidden">
        {/* Background image with overlay */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1462007895615-c8c073bebcd8?auto=format&fit=crop&w=2000&q=80"
            alt="Dubai skyline"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-[#071635] via-[#0B1F4D]/95 to-[#071635]/80 mix-blend-multiply" />
          <div className="absolute inset-0 bg-grid-pattern opacity-40" />
        </div>

        <div className="relative z-10 flex flex-col justify-between p-12 text-white w-full">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#2563EB] to-[#6D4AFF] flex items-center justify-center shadow-lg shadow-blue-500/30">
              <Cpu className="w-6 h-6 text-white" strokeWidth={2.2} />
            </div>
            <div>
              <div className="font-heading text-xl font-bold tracking-tight">GHAZA COMPUTER</div>
              <div className="text-xs text-white/60 uppercase tracking-[0.2em]">Sale & Service of Laptop Spare Parts</div>
            </div>
          </div>

          {/* Center hero text */}
          <div className="space-y-6 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur border border-white/15 text-xs font-medium">
              <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
              <span>UAE&apos;s trusted laptop spare-parts partner</span>
            </div>
            <h1 className="font-heading text-4xl xl:text-5xl font-bold leading-tight tracking-tight">
              Run your spare-parts business <span className="bg-gradient-to-r from-blue-300 to-purple-300 bg-clip-text text-transparent">with precision.</span>
            </h1>
            <p className="text-base text-white/70 leading-relaxed">
              From Sharjah to Abu Dhabi — manage inventory, POS sales, quotations, HR documents and multi-branch
              operations from a single control room. Built for retailers, wholesalers and laptop repair specialists across the UAE.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 pt-4">
              {[
                { label: 'Active Branches', value: '5' },
                { label: 'SKUs Tracked', value: '4,200+' },
                { label: 'AED Processed / mo', value: '12.8M' },
              ].map((s) => (
                <div key={s.label} className="border-l-2 border-blue-400/40 pl-3">
                  <div className="font-heading text-xl font-bold tabular-nums">{s.value}</div>
                  <div className="text-[11px] uppercase tracking-wider text-white/50">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Trust badges */}
          <div className="flex items-center gap-2 text-xs text-white/50">
            <ShieldCheck className="w-4 h-4" />
            <span>Bank-grade encryption · VAT compliant · UAE-hosted</span>
          </div>
        </div>
      </div>

      {/* Right: Login Form */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-12 bg-white">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="lg:hidden flex items-center gap-3 mb-8">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#2563EB] to-[#6D4AFF] flex items-center justify-center">
              <Cpu className="w-5 h-5 text-white" strokeWidth={2.2} />
            </div>
            <div>
              <div className="font-heading text-lg font-bold text-[#071635]">GHAZA COMPUTER</div>
              <div className="text-[10px] text-gray-500 uppercase tracking-[0.18em]">Spare Parts Management</div>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="font-heading text-3xl font-bold text-gray-900 tracking-tight">Welcome back</h2>
            <p className="mt-1.5 text-sm text-gray-500">Sign in to access your branch dashboard</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-1.5">
              <Label htmlFor="email" className="text-sm font-medium">Email or Username</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  id="email"
                  data-testid="login-email-input"
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-9 h-11 border-gray-300 focus-visible:ring-blue-500/20 focus-visible:border-blue-500"
                  required
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-sm font-medium">Password</Label>
                <button type="button" data-testid="login-forgot-password" className="text-xs font-medium text-blue-600 hover:underline">
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  id="password"
                  data-testid="login-password-input"
                  type={showPwd ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-9 pr-10 h-11 border-gray-300 focus-visible:ring-blue-500/20 focus-visible:border-blue-500"
                  required
                />
                <button
                  type="button"
                  data-testid="login-toggle-password"
                  onClick={() => setShowPwd(!showPwd)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPwd ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="branch" className="text-sm font-medium">Branch</Label>
              <Select value={branch} onValueChange={setBranch}>
                <SelectTrigger id="branch" data-testid="login-branch-select" className="h-11 border-gray-300">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {branches.map(b => (
                    <SelectItem key={b.id} value={b.id} data-testid={`login-branch-option-${b.id}`}>
                      <div>
                        <div className="font-medium text-sm">{b.name}</div>
                        <div className="text-xs text-muted-foreground">{b.location}</div>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-2">
              <Checkbox id="remember" data-testid="login-remember-me" defaultChecked />
              <Label htmlFor="remember" className="text-sm text-gray-600 cursor-pointer select-none">Remember me on this device</Label>
            </div>

            <Button
              type="submit"
              data-testid="login-submit-button"
              disabled={loading}
              className="w-full h-11 bg-[#0B1F4D] hover:bg-[#071635] text-white font-medium rounded-lg shadow-md shadow-blue-900/20 group"
            >
              {loading ? 'Signing in...' : <>Sign in <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-0.5 transition-transform" /></>}
            </Button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-200" /></div>
              <div className="relative flex justify-center"><span className="bg-white px-3 text-xs text-gray-400 uppercase tracking-wider">Or</span></div>
            </div>

            <Button
              type="button"
              data-testid="login-otp-button"
              variant="outline"
              className="w-full h-11 border-gray-300 hover:border-blue-400 hover:bg-blue-50/50 font-medium"
            >
              <Smartphone className="w-4 h-4 mr-2" />
              Sign in with OTP
            </Button>
          </form>

          <p className="mt-8 text-center text-xs text-gray-500">
            By signing in, you agree to GHAZA COMPUTER&apos;s Terms &amp; Privacy Policy.
          </p>
        </div>
      </div>

      <Toaster position="top-right" richColors />
    </div>
  );
}
