import React from 'react';

const useCustomAlert = () => {
  const [alertStore, dispatch] = React.useReducer(
    (state, action) => {
      switch (action.type) {
        case 'SHOW_ALERT':
          return { ...state, alert: { ...action.payload, isVisible: true } };
        case 'HIDE_ALERT':
          return {
            ...state,
            alert: { title: '', message: '', buttonText: '', isVisible: false },
          };
        default:
          return state;
      }
    },
    {
      alert: {
        title: '',
        message: '',
        buttonText: '',
        isVisible: false,
      },
    },
  );

  return [alertStore, dispatch];
};

export default useCustomAlert;
