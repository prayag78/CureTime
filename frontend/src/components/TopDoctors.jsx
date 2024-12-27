import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

const TopDoctors = () => {
    const navigate = useNavigate();
    const { doctors } = useContext(AppContext);

    useEffect(() => {
        const scrollers = document.querySelectorAll(".scroller");

        if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            addAnimation();
        }

        function addAnimation() {
            scrollers.forEach((scroller) => {
                scroller.setAttribute("data-animated", true);

                const scrollerInner = scroller.querySelector(".scroller-inner");
                const scrollerContent = Array.from(scrollerInner.children);

                scrollerContent.forEach((item) => {
                    const duplicatedItem = item.cloneNode(true);
                    duplicatedItem.setAttribute("aria-hidden", true);
                    scrollerInner.appendChild(duplicatedItem);
                });

                scrollerInner.style.animation = `scroll 20s linear infinite`;
            });
        }
    }, []);

    return (
        <div className='flex flex-col items-center gap-4 my-6 text-gray-900 md:mx-10'>
            <h1 className='text-3xl font-medium'>Top Doctors to Book</h1>
            <p className='sm:w-1/3 text-center text-sm'>Simply browse through our extensive list of trusted doctors.</p>
            
            <div className='scroller w-full overflow-hidden'>
                <div className='scroller-inner flex gap-4'>
                    {doctors.slice(0,8).map((item, index) => (
                        <div 
                            key={index}
                            onClick={() => navigate(`/appointment/${item._id}`)} 
                            className='w-64 border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500'
                        >
                            <img className='bg-blue-50' src={item.image} alt={item.name} />
                            <div className='p-4'>
                                <div className={`flex items-center gap-2 text-sm text-center ${item.available ? 'text-green-500' : 'text-gray-500'}`}>
                                    <p className={`w-2 h-2 ${item.available ? 'bg-green-500' : 'bg-gray-500'} rounded-full`}></p>
                                    <p>{item.available ? 'Available' : 'Not Available'}</p>
                                </div>
                                <h2 className='text-lg font-semibold'>{item.name}</h2>
                                <p className='text-sm'>{item.speciality}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <button 
                onClick={() => { 
                    navigate('/doctors'); 
                    window.scrollTo(0, 0);
                }} 
                className='bg-blue-50 rounded-full text-gray-600 px-12 py-3 mt-10'>
                More
            </button>
        </div>
    );
};

export default TopDoctors;
