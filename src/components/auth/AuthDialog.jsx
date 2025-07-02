
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

const AuthDialog = ({ isOpen, onClose }) => {
  const { signIn, signUp } = useAuth();
  const { toast } = useToast();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    age: '',
    email: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      let result;
      if (isLogin) {
        result = await signIn(formData.email, formData.password);
      } else {
        // Validation for registration
        if (parseInt(formData.age) < 18) {
          toast({
            title: "Ошибка",
            description: "Возраст должен быть не менее 18 лет",
            variant: "destructive"
          });
          setIsLoading(false);
          return;
        }
        
        result = await signUp(
          formData.email,
          formData.password,
          formData.firstName,
          formData.lastName,
          formData.age
        );
      }

      if (!result.error) {
        onClose();
        setFormData({
          firstName: '',
          lastName: '',
          age: '',
          email: '',
          password: ''
        });
        toast({
          title: "Успешно!",
          description: isLogin ? "Вы успешно вошли в систему" : "Регистрация прошла успешно"
        });
      } else {
        toast({
          title: "Ошибка",
          description: result.error,
          variant: "destructive"
        });
      }
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Произошла ошибка. Попробуйте снова.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
    setFormData({
      firstName: '',
      lastName: '',
      age: '',
      email: '',
      password: ''
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{isLogin ? 'Вход в аккаунт' : 'Регистрация'}</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName">Имя</Label>
                  <Input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required={!isLogin}
                  />
                </div>
                <div>
                  <Label htmlFor="lastName">Фамилия</Label>
                  <Input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required={!isLogin}
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="age">Возраст</Label>
                <Input
                  type="number"
                  id="age"
                  name="age"
                  min="18"
                  value={formData.age}
                  onChange={handleInputChange}
                  required={!isLogin}
                />
              </div>
            </>
          )}
          
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>
          
          <div>
            <Label htmlFor="password">Пароль</Label>
            <Input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
          </div>
          
          <Button 
            type="submit" 
            className="w-full"
            disabled={isLoading}
          >
            {isLoading ? 'Загрузка...' : (isLogin ? 'Войти' : 'Зарегистрироваться')}
          </Button>
          
          <div className="text-center">
            <button
              type="button"
              onClick={toggleAuthMode}
              className="text-sm text-primary hover:underline"
            >
              {isLogin ? 'Нет аккаунта? Зарегистрируйтесь' : 'Уже есть аккаунт? Войдите'}
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AuthDialog;
