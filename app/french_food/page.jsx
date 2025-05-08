import Header from "@/components/pages/french_food/header";
import Offres from "@/components/pages/french_food/offres";
import RateForm from "@/components/pages/french_food/rateForm";
import ScrollFood from "@/components/pages/french_food/scrollFood";

export default function FrenchFood(){
    return(
        <div>
            <Header/>
            <ScrollFood/>
            <Offres/>
            <RateForm/>
            <div className="  flex flex-col gap-4 pt-10">
                <h2 className=" font-primary text-center text-3xl lg:text-6xl font-semibold uppercase"><span className=" text-primary">T’as faim ?</span> Suis la bonne adresse ! 😋</h2>
                <div className=" p-5 lg:p-10">
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3398.391669691419!2d-8.0275197!3d31.59572589999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xdafe8d327825d4f%3A0x685763b92bfeb1f!2sFrench%20food!5e0!3m2!1sen!2sma!4v1746634644790!5m2!1sen!2sma" className=" shadow-2xl border-4 border-primary  w-full h-[80vh]"  allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                </div>
            </div>
        </div>
    )
}