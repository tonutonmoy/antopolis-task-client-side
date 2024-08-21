"use client";

import { useCreateCategoryMutation } from "@/Redux/api/animalAndCaregory";

import { useState } from "react";
import { toast } from "sonner";

const CategoryModal = () => {

 
    const [isCenterModalOpen, setCenterModalOpen] = useState(false);
    const [name, setName] = useState('');

    const [createCategory] = useCreateCategoryMutation();

    const openCenterModal = () => {
        setCenterModalOpen(true);
    };

    const closeCenterModal = () => {
        setCenterModalOpen(false);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!name.trim()) {
            return toast.error('Category name cannot be empty.');
        }

        try {
            await createCategory({ name }).unwrap();
            toast.success('Category added successfully!');
            setName(''); // Clear the input field
            closeCenterModal(); // Close the modal
            
        } catch (err) {
            console.error('Failed to add category:', err);
            toast.error('Failed to add category. Please try again.');
        }
    };

    return (
        <div>
            <div className="space-y-2">
                {/* Button trigger for vertically centered modal */}
                <button
                    type="button"
                    className="px-[20px] py-[10px] rounded-full bg-black text-gray-50 text-[18px] font-normal border border-white"
                    onClick={openCenterModal}
                >
                    Add Category
                </button>

                {/* Vertically centered modal */}
                {isCenterModalOpen && (
                    <div className="fixed top-0 left-0 flex items-center justify-center h-full w-full bg-black bg-opacity-50">
                        <div className="bg-white p-4 w-[90%] md:w-[50%] lg:w-[30%] pt-14 pb-10 relative rounded-[20px]">
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label
                                        htmlFor="name"
                                        className="block mb-6 text-sm font-medium text-gray-900 dark:text-white text-[20px]"
                                    >
                                        Add Category
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        id="name"
                                        placeholder="Name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="py-3 w-full text-[18px] px-3 flex justify-center rounded-lg border-white bg-black font-[400] text-white"
                                >
                                    Save
                                </button>
                            </form>
                            <button
                                className="rounded-full hover:bg-red-500 text-white w-10 h-10 bg-[conic-gradient(at_bottom,_var(--tw-gradient-stops))] from-red-500/90 via-black to-red-500/90 absolute top-0 right-0"
                                onClick={closeCenterModal}
                            >
                                X
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CategoryModal;
