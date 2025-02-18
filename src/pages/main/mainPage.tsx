import { useEffect, useRef, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router';
import { getProducts } from '../../api/api';
import { useAuth } from "../../utils/hooks";
import ProductsItem from '../../components/products-components/productsItem/productsItem';
import styles from './mainPage.module.css';
import { Product } from '../../utils/types';
import { Pagination } from 'antd';
import { INITIAL_PRODUCT_LIM } from '../../utils/constants';

const MainPage = () => {
    // auth data
    const { isAuthenticated, token } = useAuth();
    // to set url params & redirect
    const nav = useNavigate();
    // states
    const [products, setProducts] = useState<Product[] | null>(null);
    const [virtualLimit, setVirtualLimit] = useState<number>(INITIAL_PRODUCT_LIM);
    const [pagesData, setPagesData] = useState<{ current_page: number, pages: number, limit: number }>();

    const [params] = useSearchParams();



    // pagination handler
    const paginationChangeHandler = (page: number) => {
        setVirtualLimit(INITIAL_PRODUCT_LIM);
        nav(`/?page=${page}`)
        setPagesData({
            ...pagesData,
            current_page: page,
            pages: pagesData?.pages ?? 0,
            limit: pagesData?.limit ?? 0  
        });
       
    }

    // init data && auth checker
    useEffect(() => {
        const body = document.querySelector('body');
        body?.scrollTo(0, 0)
        const fetchData = async () => {
            if (isAuthenticated && token) {
                const page = params.get('page')
                const data = await getProducts({token, page});

                if (data) {
                    const { current_page, pages, limit, products } = data;
                    setPagesData({ current_page, pages, limit });
                    setProducts(products)
                    
                }

            } else {
                nav('/signin');
            }
        };
        fetchData();
    }, [isAuthenticated, token, params])


    // --------- observer ---------//
    const observerRef = useRef(null);
    const observerOptions = {
        root: null,
        rootMargin: '0px 0px 50px 0px',
        threshold: 0.1,
    }
    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            const [entry] = entries;
            if (products && entry.isIntersecting && virtualLimit < products.length) {
                setVirtualLimit(prevLimit => prevLimit + 5);
            }
        }, observerOptions);
    
        const currentRef = observerRef.current;
        if (currentRef) {
            observer.observe(currentRef);
        }
    
        return () => {
            if (currentRef) {
                observer.unobserve(currentRef);
            }
        };
    }, [observerRef, virtualLimit, products]);

    //--------

    return (
        <>
            {products && <section className={styles.page}>
                <div className={styles.container}>filters</div>
                <div className={styles.container}>
                    {products.slice(0, virtualLimit).map((i) => <ProductsItem item={i} key={i.id} />)}
                    <div
                        style={{ width: '100%', height: '10px' }}
                        ref={observerRef}
                    >
                        {virtualLimit >= products.length && pagesData &&
                            <Pagination 
                                defaultCurrent={pagesData.current_page}
                                total={pagesData.pages * pagesData.limit}
                                onChange={paginationChangeHandler}
                            />
                        }
                    </div>
                </div>
            </section>}
        </>
    )
}

export default MainPage;

