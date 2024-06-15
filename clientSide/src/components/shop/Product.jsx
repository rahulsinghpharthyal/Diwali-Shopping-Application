import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as regularHeart } from "@fortawesome/free-regular-svg-icons";
import { useCart } from "../cart/CartContext";
import axios from "axios";
import { useUser } from "../navbar/UserProvider";
import Modal from "../../Pages/Modal"; // Import the Modal component

const Product = ({ id, title, price, image, sale, rating }) => {
  const [hovered, setHovered] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [favorited, setFavorited] = useState(false);
  const [notification, setNotification] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const { addToCart, addToWishlist, removeFromWishlist } = useCart();

  const { user } = useUser();

  useEffect(() => {
    if (notification) {
      setShowPopup(true);

      const timer = setTimeout(() => {
        setShowPopup(false);
        setNotification("");
      }, 3000); // Popup disappears after 3 seconds
      return () => clearTimeout(timer);
    }
  }, [notification]);

  const handleAddToCart = async () => {
    if (!user) {
      setModalMessage("Please log in to add items to your cart");
      setShowModal(true);
      return;
    } else {
      const userId = user._id;
      const data = {
        id,
        userId,
        title,
        price,
        image,
        sale: `${sale}`,
        rating: `${rating}`,
      };
      const headers = {
        "Content-Type": "application/json",
      };

      try {
        await axios.put("http://localhost:3002/addtocart", data, { headers });
        addToCart({ id, title, price, image, sale, rating });
        setNotification("Item added to cart!");
        // setShowModal(true);
      } catch (error) {
        setModalMessage("Please log in to add items to your cart");
        setShowModal(true);
      }
    }
  };

  const toggleFavorite = async (_id) => {
    if (!user) {
      setModalMessage("Please log in to add items to your wishlist");
      setShowModal(true);
      return;
    }
    if (!favorited) {
      try {
        const userId = user._id;
        const data = {
          id,
          userId,
          title,
          price,
          image,
          sale: `${sale}`,
          rating: `${rating}`,
        };
        const headers = {
          "Content-Type": "application/json",
        };

        await axios.put("http://localhost:3002/wishlist", data, { headers });
        addToWishlist({ id, title, price, image, sale, rating });
        setNotification("Item added to wishlist!");
        // setShowModal(true);
      } catch (error) {
        setModalMessage("Please log in to add items to your wishlist");
        setShowModal(true);
      }
    } else {
      try {
        removeFromWishlist(_id);
        setModalMessage("Item removed from wishlist!");
        setShowModal(true);
      } catch (error) {
        setModalMessage("Failed to remove item from wishlist");
        setShowModal(true);
      }
    }

    setFavorited(!favorited);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div
      className="border border-gray-300 rounded-lg overflow-hidden relative"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Modal show={showModal} onClose={closeModal} message={modalMessage} />
      {showPopup && (
        <div className=" bg-green-500 text-white text-sm px-4 py-2 rounded-md absolute top-4 right-4 z-50">
          {notification}
        </div>
      )}
      <img
        src={image}
        alt={title}
        className="w-full h-96 object-cover object-center"
      />
      <div className="p-4 relative">
        <h3 className="text-lg font-bold relative">
          {title}
          {hovered && (
            <div className="absolute top-4 right-1 flex justify-between gap-3">
              <button
                className="bg-blue-500 text-white text-xs uppercase px-2 py-1 rounded-lg"
                onClick={handleAddToCart}
              >
                Add to Cart
              </button>
              <FontAwesomeIcon
                icon={favorited ? solidHeart : regularHeart}
                className={`w-6 h-6 ${
                  favorited ? "text-red-500" : "text-gray-500"
                } cursor-pointer`}
                onClick={toggleFavorite}
              />
            </div>
          )}
        </h3>
        <div className="flex items-center mt-2 mb-4">
          {Array.from({ length: 5 }, (_, i) => (
            <svg
              key={i}
              className={`w-4 h-4 ${
                i < rating ? "text-yellow-500" : "text-gray-300"
              }`}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.028 3.16a1 1 0 00.95.691h3.316c.969 0 1.371 1.24.588 1.81l-2.687 1.955a1 1 0 00-.364 1.118l1.028 3.16c.3.921-.755 1.688-1.538 1.118L10 13.011l-2.687 1.955c-.782.57-1.838-.197-1.538-1.118l1.028-3.16a1 1 0 00-.364-1.118L3.752 8.588c-.783-.57-.381-1.81.588-1.81h3.316a1 1 0 00.95-.691l1.028-3.16z" />
            </svg>
          ))}
        </div>
        <span className="text-lg font-bold">{price}</span>
      </div>
    </div>
  );
};

export default Product;
