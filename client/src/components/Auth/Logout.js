import React from 'react';

const Logout = () => {
  const handleLogout = () => {
    localStorage.clear();
  }

  return(
    <button onClick={handleLogout}>
      Logout
    </button>
  )
}

export default Logout;