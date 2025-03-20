import React, {useEffect, useState} from "react";
import {Button, Label, Select} from "flowbite-react";
import {useLocation, useNavigate} from "react-router-dom";
import TextInputWithHeaderFB from "../../../shared/components/TextInputWithHeaderFB";
import {useDispatch} from "react-redux";
import {createProduct, updateProduct} from "../../../redux/features/productSlice";

export default function AddEditContainer() {
    const [formData, setFormData] = useState({})
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {state} = useLocation();

    useEffect(() => {
        if (state !== null) {
            if (state.merchandise) {
                setFormData({
                    id: state.merchandise.id,
                    name: state.merchandise.name,
                    category: state.merchandise.category.category,
                    price: state.merchandise.price,
                    stock: state.merchandise.stock,
                    artistId: state.merchandise.artist.id,
                    type: state.merchandise.type.type
                });
            } else {
                setFormData({
                    name: '',
                    category: '',
                    price: '',
                    stock: '',
                    artistId: state.artist.id,
                    type: ''
                });
            }
        } else {
            navigate('/my-store')
        }
    }, [navigate, state]);

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const action = formData.id === undefined ? createProduct(formData) : updateProduct(formData)
            await dispatch(action).unwrap()
            navigate('/my-store')
        } catch (error) {
            console.error('Error submitting form:', error)
        }
    };

    return (
        <div
            className="bg-fixed flex justify-center items-center min-h-screen bg-[url('https://images.unsplash.com/photo-1482160549825-59d1b23cb208?q=80&w=1469&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] bg-gray-400 bg-blend-multiply">
            <div
                className="mt-40 mb-20 w-full max-w-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-12 flex flex-col justify-center items-center rounded-3xl">
                <h1 className="text-2xl font-semibold">Register Merchandise</h1>
                <form
                    className="flex w-full flex-col gap-4 pt-6 px-4"
                    onSubmit={handleSubmit}
                >
                    <TextInputWithHeaderFB
                        id="name"
                        nameLabel="Name"
                        nameInput="name"
                        type="text"
                        placeholder="Oratrice Mecanique d'Analyse Cardinale"
                        value={formData.name}
                        onChange={handleChange}
                    />
                    <div>
                        <Label
                            htmlFor="category"
                            className="block text-sm font-semibold text-gray-700 pb-3"
                        >
                            Select a category:
                        </Label>
                        <Select
                            id="category"
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            required
                            className="pb-3"
                        >
                            <option value="">Select a category</option>
                            <option value="AUDIO">AUDIO</option>
                            <option value="COSPLAY">COSPLAY</option>
                            <option value="FASHION">FASHION</option>
                            <option value="FIGURES">FIGURES</option>
                            <option value="GAMES">GAMES</option>
                            <option value="GOODS">GOODS</option>
                            <option value="ILLUSTRATION">ILLUSTRATION</option>
                            <option value="NOVEL_BOOKS">NOVEL_BOOKS</option>
                            <option value="MUSIC">MUSIC</option>
                            <option value="PHOTOGRAPH">PHOTOGRAPH</option>
                            <option value="SOFTWARE_HARDWARE">SOFTWARE_HARDWARE</option>
                            <option value="VIDEO">VIDEO</option>
                        </Select>
                    </div>
                    <TextInputWithHeaderFB
                        id="price"
                        nameInput="price"
                        nameLabel="Price"
                        type="number"
                        placeholder="Example: 69000"
                        value={formData.price}
                        onChange={handleChange}
                    />
                    <TextInputWithHeaderFB
                        id="stock"
                        nameLabel="Stock"
                        nameInput="stock"
                        type="number"
                        placeholder="Example: 420"
                        value={formData.stock}
                        onChange={handleChange}
                    />
                    <div>
                        <Label
                            htmlFor="type"
                            className="block text-sm font-semibold text-gray-700 pb-3"
                        >
                            Select a type:
                        </Label>
                        <Select
                            id="type"
                            name="type"
                            value={formData.type}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select a type</option>
                            <option value="DIGITAL">DIGITAL</option>
                            <option value="PHYSICAL">PHYSICAL</option>
                        </Select>
                    </div>
                    <Button
                        type="submit"
                        className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-xl"
                    >
                        Submit
                    </Button>
                </form>
            </div>
        </div>
    );
}
