
-- Create an enum for user roles
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

-- Create user_roles table
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL DEFAULT 'user',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE (user_id, role)
);

-- Enable RLS on user_roles
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Create a security definer function to check user roles
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- Create a function to get user role
CREATE OR REPLACE FUNCTION public.get_user_role(_user_id UUID)
RETURNS app_role
LANGUAGE SQL
STABLE
SECURITY DEFINER
AS $$
  SELECT role
  FROM public.user_roles
  WHERE user_id = _user_id
  LIMIT 1
$$;

-- RLS policies for user_roles
CREATE POLICY "Users can view their own roles" ON public.user_roles
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all roles" ON public.user_roles
  FOR SELECT USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can manage all roles" ON public.user_roles
  FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- Update the handle_new_user function to assign default role
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  -- Insert profile
  INSERT INTO public.profiles (id, full_name, avatar_url)
  VALUES (
    new.id,
    new.raw_user_meta_data->>'full_name',
    new.raw_user_meta_data->>'avatar_url'
  );
  
  -- Assign default user role
  INSERT INTO public.user_roles (user_id, role)
  VALUES (new.id, 'user');
  
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Update products policies to allow admin access
DROP POLICY IF EXISTS "Anyone can view products" ON public.products;
CREATE POLICY "Anyone can view products" ON public.products
  FOR SELECT USING (true);

CREATE POLICY "Admins can manage products" ON public.products
  FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- Update orders policies to allow admin access
CREATE POLICY "Admins can view all orders" ON public.orders
  FOR SELECT USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can manage all orders" ON public.orders
  FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- Update order_items policies to allow admin access
CREATE POLICY "Admins can view all order items" ON public.order_items
  FOR SELECT USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can manage all order items" ON public.order_items
  FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- Update pre_orders policies to allow admin access
CREATE POLICY "Admins can view all pre-orders" ON public.pre_orders
  FOR SELECT USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can manage all pre-orders" ON public.pre_orders
  FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- Insert a default admin user role (you'll need to replace this UUID with an actual user ID after creating an admin account)
-- This is just a placeholder - you'll need to manually assign admin role to a user after they register
