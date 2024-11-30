import { useCallback } from 'react';
import toast from 'src/components/alert';


const useToast = () => {
  const error = useCallback((messageText = '') => {
    toast({
      type: 'error',
      message: messageText,
    });
  }, []);
  const warning = useCallback((messageText = '') => {
    toast({
      type: 'warning',
      message: messageText,
    });
  }, []);

  const success = useCallback((messageText) => {
    toast({
      type: 'success',
      message: messageText,
    });
  }, []);

  const destroy = useCallback(() => {
    toast.dismiss();
  }, []);

  return {
    warning,
    error,
    success,
    destroy,
  };
};

export default useToast;
