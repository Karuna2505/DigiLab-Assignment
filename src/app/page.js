"use client"
import React, { useEffect,useState } from 'react';
function ErrorMessage() {
  return (
    <div className="flex flex-col justify-center items-center w-[327px] min-h-[71px]">
      <h1 className="text-[29px] font-medium leading-[31.9px] mb-4">
        Lorem Ipsum...
      </h1>
      <h1 className="text-[19px] font-normal leading-[22.99px] text-white text-opacity-60">
        Lorem ipsum dolor sit amet.
      </h1>
    </div>
  );
}

function ImageContainer({isclicked}) {
  return (
    <div className="relative">
      <img className="object-cover w-full h-full" src="/fourth.svg" alt="Outer-Image"/>
      <img className={`absolute transform -translate-x-1/2 -translate-y-1/2  ${isclicked ? 'bell inset-[40.5%]' : 'inset-1/2'}`} src="/bell.svg" alt="inner-Image"/>
    </div>
  );
}

function Button({isclicked,setClicked}) {
  const handleNotification = () => {
    setClicked(!isclicked)
    Notification.requestPermission().then(permission => {
      if (permission === 'granted') {
        console.log("Permission granted");
        try {
          const notify = new Notification("Notification ", {
            body: "Notification from Digilab",
            icon: '/bell.svg',
          });
          console.log("Notification created successfully:", notify);
        } catch (error) {
          console.error("Error creating notification:", error);
        }
      } else {
        console.log("Permission denied");
      }
    });
  }
  
  return (
    <button onClick={handleNotification} className="w-[327px] h-[47px] p-2 button-bg shadow-button font-semibold border-gradient gap-2">
      Send Notification
    </button>
  );
}

export default function Home() {
  const [isclicked,setClicked]=useState(false);
  useEffect(() => {
    const timer = setTimeout(() => {
      setClicked(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, [isclicked]); 

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js').then(registration => {
          console.log('Service worker registered:', registration);
        }).catch(error => {
          console.error('Service worker registration failed:', error);
        });
      });
    }
  }, []);
  return (
    <div className="flex flex-col justify-evenly items-center h-screen">
      <ErrorMessage />
      <ImageContainer isclicked={isclicked}/>
      <Button isclicked={isclicked} setClicked={setClicked}/>
    </div>
  );
}
