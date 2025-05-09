import Image from "next/image";


export default function Loading() {
    return (
      <>
        <div className={`fixed  inset-0 flex flex-col items-center justify-center bg-primary  duration-1000 transition z-50 `}>
          <Image src={'/img/logo-white.png'} width={500} height={500} className="w-52 animate-bounce" alt="art by Warda" title="art by Warda" />
          <h1 className=" font-primary text-5xl font-bold text-white animate-pulse">French food</h1>
          <div className="flex items-center justify-center mt-4">
            <svg className="animate-spin h-10 w-10 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" strokeWidth="4" stroke="currentColor" fill="none"/>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 1 1 16 0A8 8 0 0 1 4 12zm2.5 0a5.5 5.5 0 1 0 11 0A5.5 5.5 0 0 0 6.5 12z"/>
            </svg>
          </div>
          
        </div>
      </>
    );
  }