import Navbar from "./navbar";

export default function AdminLayout({ children }) {
    return (
      <section className=" flex ">
        <div className="w-1/4 hidden lg:block">
            <Navbar/>
        </div>
        <div className="p-10 w-full" >
          {children}
        </div>
      </section>
    )
    
  }