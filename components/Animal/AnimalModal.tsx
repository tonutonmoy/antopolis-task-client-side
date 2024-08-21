"use client";

import { useCreateAnimalMutation, useGetCategoryQuery } from "@/Redux/api/animalAndCaregory";
import { useState } from "react";
import { toast } from "sonner";

const AnimalModal = () => {
    const [isCenterModalOpen, setCenterModalOpen] = useState(false);
    const [createFunction] = useCreateAnimalMutation();
    const { data, refetch, isLoading }:any = useGetCategoryQuery();

 

    if(isLoading){
      return ''
    }

    const openCenterModal = () => {
        setCenterModalOpen(true);
    };

    const closeCenterModal = () => {
        setCenterModalOpen(false);
    };

    const handler = (e: any) => {
        e.preventDefault();

        const img = e.target.img.files[0];
        const name = e.target.name.value;
        const category = e.target.category.value;  // Corrected name
        const info: any = {};

        if (!img) {
            return toast.error("Image is missing");
        }

        const image_hosting_url = `https://api.imgbb.com/1/upload?key=${
            "8460cd1a14bf680b3bf68fe6e9950c8d"
        }`;

        const formData = new FormData();
        formData.append("image", img);

        fetch(image_hosting_url, {
            method: "POST",
            body: formData,
        })
            .then((res) => res.json())
            .then(async (imageResponse) => {
                if (imageResponse.success) {
                    const imageURL = imageResponse.data.display_url;
                    info.name = name;
                    info.img = imageURL;
                    info.category = category;  // Corrected name

                    try {
                        await createFunction(info).unwrap();
                        toast.success("Animal added successfully!");
                        closeCenterModal();
                    } catch (error) {
                        toast.error("Failed to add animal.");
                    }
                }
            });
    };

    return (
        <div>
            <div className="space-y-2">
                <button
                    type="button"
                    className="px-[20px] py-[10px] rounded-full bg-black text-gray-50 text-[18px] font-normal border border-white"
                    onClick={openCenterModal}
                >
                    Add Animal
                </button>

                {isCenterModalOpen && (
                    <div className="fixed top-0 left-0 flex items-center justify-center h-full w-full bg-black bg-opacity-50">
                        <div className="bg-white p-4 w-[90%] md:w-[50%] lg:w-[30%] pt-14 pb-10 relative rounded-[20px]">
                            <form onSubmit={handler} className="space-y-4">
                                <div className="mb-8">
                                    <label
                                        htmlFor="name"
                                        className="block mb-3 text-sm font-medium text-gray-900 dark:text-white text-[20px]"
                                    >
                                        Add Animal
                                    </label>
                                    <input
                                        required
                                        type="text"
                                        name="name"
                                        id="name"
                                        placeholder="Animal Name"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                    />
                                </div>

                                <div className="mb-8">
                                    <label
                                        htmlFor="category"
                                        className="block mb-3 text-sm font-medium text-gray-900 dark:text-white text-[20px]"
                                    >
                                        Add Category
                                    </label>
                                    <select
                                        required
                                        name="category"  // Corrected name
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                    >
                                        <option value="">Select Category</option>
                                        {data?.data?.map((a: any) => (
                                            <option key={a._id} value={a.name}>
                                                {a.name} 
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <input
                                        name="img"
                                        type="file"
                                        required
                                        className="file-input w-full max-w-xs"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="py-3 w-full px-3 flex justify-center rounded-lg border-white bg-black font-[400] text-[18px] text-white"
                                >
                                    Create Animal
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

export default AnimalModal;
