import toast from 'react-hot-toast';

export const showSuccessToast = (message) => {
  toast.success(message, {
    style: {
      border: '1px solid #4caf50',
      padding: '16px',
      color: '#4caf50',
    },
    iconTheme: {
      primary: '#4caf50',
      secondary: '#FFFFFF',
    },
  });
};

export const showErrorToast = (message) => {
  toast.error(message, {
    style: {
      border: '1px solid #f44336',
      padding: '16px',
      color: '#f44336',
    },
    iconTheme: {
      primary: '#f44336',
      secondary: '#FFFFFF',
    },
    duration: 4000,
    // Add a retry button if needed
    action: {
      text: 'Retry',
      onClick: (e, toastObject) => {
        // Define retry logic here
        console.log('Retry clicked');
        toast.dismiss(toastObject.id);
      }
    }
  });
};
