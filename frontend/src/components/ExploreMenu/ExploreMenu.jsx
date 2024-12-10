import { menu_list } from '../../assets/assets';
import './ExploreMenu.css';
import PropTypes from 'prop-types';

const ExploreMenu = ({ category, setCategory }) => {

    const handleMouseEnter = (itemName) => {
        setCategory(itemName);
    }

    const handleMouseLeave = () => {
        setCategory("All");
    }

    return (
        <div className='explore-menu' id='explore-menu'>
            <h1>Explore our menu</h1>
            <p className='explore-menu-text'>Choose from menu list to join our meal</p>
            <div className="explore-menu-list">
                {menu_list.map((item, index) => {
                    return (
                        <div
                            key={index}
                            className='explore-menu-list-item'
                            onMouseEnter={() => handleMouseEnter(item.menu_name)} // Khi di chuyển chuột vào
                            onMouseLeave={handleMouseLeave} // Khi di chuyển chuột ra ngoài
                        >
                            <img className={category === item.menu_name ? "active" : ""} src={item.menu_image} alt="" />
                            <p>{item.menu_name}</p>
                        </div>
                    )
                })}
            </div>
            <hr />
        </div>
    );
}

ExploreMenu.propTypes = {
    category: PropTypes.string.isRequired,
    setCategory: PropTypes.func.isRequired,
};

export default ExploreMenu;
