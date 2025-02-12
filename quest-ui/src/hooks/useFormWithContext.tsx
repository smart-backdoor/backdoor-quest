import { type ReactNode } from 'react';
import { FormProvider, useForm, type ValidationMode } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { type z } from 'zod';

interface IContextProps {
  defaultValues: Record<string, any>;
  mode?: keyof ValidationMode;
  validationSchema?: any;
}

export function stopPreventAndPropagate(callback: () => void) {
  return (e: { preventDefault: () => void; stopPropagation: () => void }) => {
    e.stopPropagation();
    e.preventDefault();
    callback();
  };
}

export const useFormWithContext = ({
  defaultValues,
  mode = 'onBlur',
  validationSchema,
}: IContextProps) => {
  const form = useForm<z.infer<typeof validationSchema>>({
    defaultValues,
    mode,
    resolver: zodResolver(validationSchema),
  });
  const renderFormWithContext = <T,>({
    children,
    onSubmit,
    ...props
  }: {
    children: ReactNode;
    onSubmit?: (values: T) => Promise<void>;
  }) => (
    <FormProvider {...form}>
      <form
        {...props}
        {...(typeof onSubmit === 'function' && {
          onSubmit: stopPreventAndPropagate(form.handleSubmit(onSubmit)),
        })}
      >
        {children}
      </form>
    </FormProvider>
  );

  return {
    ...form,
    renderFormWithContext,
  };
};
