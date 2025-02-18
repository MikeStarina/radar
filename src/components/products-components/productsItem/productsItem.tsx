import styles from './productsItem.module.css'
import { Product } from '../../../utils/types';
import { MAIN_URL } from '../../../utils/constants';
const ProductsItem: React.FC<{ item: Product }> = ({ item }) => {


    // have to rewrite it as list
    return (
        <div className={styles.item}>
            <div className={styles.itemPicWrapper}>
                <img src={`${MAIN_URL}/${item.images[0]}`} alt='' className={styles.pic} height={300} width={250}></img>
            </div>
            <div className={styles.wrapper}>
                <div className={styles.info}>
                    <h3>{item.name}</h3>
                    <p>Desc: {item.description}</p>
                    <p>Brand: {item.brand}</p>
                    <p>Color: {item.color}</p>
                    <p>Dims: {item.dimensions}</p>
                    <p>Rating: {item.rating}</p>
                    <p>Stock: {item.stock}</p>
                    <p>Weight: {item.weight}</p>
                </div>

                <div className={styles.priceBox}>
                    <p className={item.discount_price ? styles.oldPrice : styles.price}>= {item.price} P.</p>
                    {item.discount_price && <p className={styles.price}> = {item.discount_price} P.</p>}
                </div>
            </div>
        </div>
    )
}

export default ProductsItem;