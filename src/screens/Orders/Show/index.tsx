import React, { useEffect } from "react";
import OrdersShowStore from "./store";
import { observer } from "mobx-react-lite";
import { useParams } from "react-router-dom";
import styles from "./styles.m.styl";
import OrderStatus from "~/components/OrderStatus";
import DeliveryType from "~/components/DeliveryType";
import Item from "./components/Item";
import { map } from "lodash";

type ShowParams = {
    id: string;
};

const OrdersShow = observer(
    (): JSX.Element => {
        const [state] = React.useState(new OrdersShowStore());
        const { id } = useParams<ShowParams>()

        useEffect(() => {
            if (state.initialized) return;
            state.initialize(id)
        })

        return (
            <div className={styles.screenWrapper}>
                <div className={styles.screen}>
                    {state.loading && <span>Loading...</span>}
                    {!state.loading && (
                        <div>
                            <div>№: {state.order?.number}</div>
                            <div className={styles.status}>
                                Статус:
                                <div className={styles.statusTag}>
                                    <OrderStatus code={state.order?.status || ''}/>
                                </div>
                            </div>
                            <div className={styles.status}>
                                Доставка:
                                <div className={styles.statusTag}>
                                    <DeliveryType code={state.order?.delivery.code || ''} />
                                </div>
                            </div>
                            <div>
                                Содержимое:
                                {map(state.order?.items, (item, index) =>
                                    <Item key={index} item={item} />
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        );
    }
);

export default OrdersShow;