import React, { useState } from 'react';
import { User, Lock, Mail, Building, MapPin, ShieldCheck, ArrowRight } from 'lucide-react';
import { useFarm } from '../context/FarmContext';
import { DEMO_USERS } from '../data/mockData';
import { UserProfile } from '../types/farm';
import { HeroModal, HeroButton, HeroInput } from './ui/HeroUIComponents';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const { login } = useFarm();
  const [mode, setMode] = useState<'login' | 'register'>('login');

  // Form states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [farmName, setFarmName] = useState('');
  const [farmLocation, setFarmLocation] = useState('');
  const [role, setRole] = useState<'Chủ trang trại' | 'Kỹ sư chăn nuôi' | 'Bác sĩ thú y'>('Chủ trang trại');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleDemoSelect = (demoUser: UserProfile) => {
    login(demoUser);
    onClose();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (mode === 'login') {
      if (!email || !password) {
        setError('Vui lòng nhập đầy đủ email và mật khẩu');
        return;
      }

      setIsSubmitting(true);
      setTimeout(() => {
        setIsSubmitting(false);
        // Check if matches demo user
        const matched = DEMO_USERS.find((u) => u.email.toLowerCase() === email.toLowerCase());
        if (matched) {
          login(matched);
        } else {
          login({
            id: `usr-${Date.now()}`,
            email,
            name: email.split('@')[0],
            role: 'Chủ trang trại',
            farmName: 'Trang Trại Gia Đình',
            farmLocation: 'Hà Nội, Việt Nam',
            farmAreaHectares: 2.0,
            phone: '0900 000 000',
          });
        }
        onClose();
      }, 400);
    } else {
      if (!name || !email || !password || !farmName) {
        setError('Vui lòng điền đủ các thông tin bắt buộc');
        return;
      }

      setIsSubmitting(true);
      setTimeout(() => {
        setIsSubmitting(false);
        const newUser: UserProfile = {
          id: `usr-${Date.now()}`,
          email,
          name,
          role,
          farmName,
          farmLocation: farmLocation || 'Việt Nam',
          farmAreaHectares: 3.5,
          phone: phone || '0988 888 888',
        };

        login(newUser);
        onClose();
      }, 400);
    }
  };

  return (
    <HeroModal
      isOpen={isOpen}
      onClose={onClose}
      maxWidth="lg"
      title={
        <div>
          <h3 className="text-base font-bold text-slate-900">
            {mode === 'login' ? 'Đăng Nhập Quản Trị Trang Trại' : 'Đăng Ký Tài Khoản Mới'}
          </h3>
          <p className="text-xs text-slate-500 font-normal">
            Hệ sinh thái điều hành và cố vấn thú y FarmPro AI
          </p>
        </div>
      }
    >
      <div className="space-y-4">
        {/* Quick Demo Accounts Selection */}
        <div className="bg-slate-50 border border-slate-200/90 rounded-2xl p-3.5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              Đăng nhập nhanh 1 chạm (Chọn vai trò mẫu):
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {DEMO_USERS.map((du) => (
              <button
                key={du.id}
                type="button"
                onClick={() => handleDemoSelect(du)}
                className="p-2.5 rounded-xl border border-slate-200 bg-white hover:border-emerald-500 hover:bg-emerald-50/50 text-left transition-all text-xs group cursor-pointer shadow-2xs hover:shadow-sm"
              >
                <p className="font-semibold text-slate-900 group-hover:text-emerald-700 truncate">
                  {du.name}
                </p>
                <p className="text-[11px] text-slate-500">{du.role}</p>
                <div className="mt-1 flex items-center text-[10px] font-medium text-emerald-600 opacity-0 group-hover:opacity-100 transition-opacity">
                  Vào ngay <ArrowRight className="w-3 h-3 ml-0.5" />
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="relative flex py-1 items-center">
          <div className="grow border-t border-slate-200"></div>
          <span className="shrink mx-3 text-slate-400 text-[11px] uppercase tracking-wider font-semibold">
            Hoặc nhập thông tin xác thực
          </span>
          <div className="grow border-t border-slate-200"></div>
        </div>

        {error && (
          <div className="p-3 text-xs bg-rose-50 text-rose-700 border border-rose-200 rounded-xl">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-3.5">
          {mode === 'register' && (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <HeroInput
                  label="Họ và tên *"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Nguyễn Văn A"
                  startIcon={<User className="w-4 h-4" />}
                />

                <div className="w-full space-y-1.5">
                  <label className="block text-xs font-semibold text-slate-700">Vai trò</label>
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value as any)}
                    className="w-full text-sm text-slate-900 bg-white rounded-xl border border-slate-300 px-3.5 py-2.5 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition"
                  >
                    <option value="Chủ trang trại">Chủ trang trại</option>
                    <option value="Bác sĩ thú y">Bác sĩ thú y</option>
                    <option value="Kỹ sư chăn nuôi">Kỹ sư chăn nuôi</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <HeroInput
                  label="Tên trang trại *"
                  type="text"
                  value={farmName}
                  onChange={(e) => setFarmName(e.target.value)}
                  placeholder="Trang trại Bình Minh"
                  startIcon={<Building className="w-4 h-4" />}
                />

                <HeroInput
                  label="Địa điểm"
                  type="text"
                  value={farmLocation}
                  onChange={(e) => setFarmLocation(e.target.value)}
                  placeholder="Đồng Nai, VN"
                  startIcon={<MapPin className="w-4 h-4" />}
                />
              </div>
            </>
          )}

          <HeroInput
            label="Email đăng nhập *"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="admin@farmpro.vn"
            startIcon={<Mail className="w-4 h-4" />}
          />

          <HeroInput
            label="Mật khẩu *"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            startIcon={<Lock className="w-4 h-4" />}
          />

          <HeroButton
            type="submit"
            variant="primary"
            size="md"
            isLoading={isSubmitting}
            className="w-full mt-2"
          >
            {mode === 'login' ? 'Đăng Nhập Hệ Thống' : 'Hoàn Tất Đăng Ký'}
          </HeroButton>
        </form>

        {/* Toggle mode */}
        <div className="text-center text-xs text-slate-500 pt-1">
          {mode === 'login' ? (
            <p>
              Chưa có tài khoản trang trại?{' '}
              <button
                type="button"
                onClick={() => setMode('register')}
                className="font-bold text-emerald-600 hover:underline cursor-pointer"
              >
                Đăng ký ngay
              </button>
            </p>
          ) : (
            <p>
              Đã có tài khoản?{' '}
              <button
                type="button"
                onClick={() => setMode('login')}
                className="font-bold text-emerald-600 hover:underline cursor-pointer"
              >
                Đăng nhập lại
              </button>
            </p>
          )}
        </div>
      </div>
    </HeroModal>
  );
};
