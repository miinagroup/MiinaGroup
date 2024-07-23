import { useEffect, useState, useMemo } from "react";
import { TableHeader, Pagination } from "../../../../components/DataTable";
import { addToCart } from "../../../../redux/actions/cartActions";
import { useDispatch } from 'react-redux';
import "./../invoicePDF.css"

const RequestedQuotesTable = ({ quotes, search }) => {

    /* sort table */
    // #region
    const [totalItems, setTotalItems] = useState(0);
    const [selectedRequestedQuotes, setSelectedRequestedQuotes] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [sorting, setSorting] = useState({ field: "status", order: "desc" });

    const ITEMS_PER_PAGE = 20;

    const quoteItems = useMemo(() => {
        let computedQuotes = quotes

        if (search) {
            computedQuotes = computedQuotes?.filter(
                (quotes) =>
                    quotes.submittedAt?.toUpperCase().includes(search.toUpperCase()) ||
                    quotes.ctlsku?.toUpperCase().includes(search.toUpperCase()) ||
                    quotes.name?.toUpperCase().includes(search.toUpperCase()) ||
                    (quotes.product?.name?.toUpperCase().includes(search.toUpperCase()) || "")
            );

        }

        setTotalItems(computedQuotes?.length);

        //Sorting products
        const getNestedProperty = (obj, path) => {
            return path.split(".").reduce((acc, part) => acc && acc[part], obj);
          };
      
          if (sorting.field) {
            const reversed = sorting.order === "asc" ? 1 : -1;
            computedQuotes = computedQuotes.sort((a, b) => {
              const fieldA = getNestedProperty(a, sorting.field);
              const fieldB = getNestedProperty(b, sorting.field);
              if (typeof fieldA === "number" && typeof fieldB === "number") {
                return reversed * (fieldA - fieldB);
              } else if (typeof fieldA === "string" && typeof fieldB === "string") {
                return reversed * fieldA.localeCompare(fieldB);
              } else {
                // If field types are different, compare their string representations
                return reversed * String(fieldA).localeCompare(String(fieldB));
              }
            });
          }
        return {
            requestedQuotes: computedQuotes?.slice(
                (currentPage - 1) * ITEMS_PER_PAGE,
                (currentPage - 1) * ITEMS_PER_PAGE + ITEMS_PER_PAGE
            ),
        };
    }, [quotes, currentPage, search, sorting]);
    // #endregion

    const completedHeaders = [
        { name: "No#", field: "index", sortable: false },
        { name: "Quoted Name", field: "name", sortable: true },
        { name: "Product Name", field: "product.name", sortable: true },
        { name: "Price", field: "price", sortable: false },
        { name: "Status", field: "status", sortable: true },
        { name: "Expires in", field: "submittedAt", sortable: true },
        { name: "", field: "activity", sortable: false },
    ];

    const calculateDueInDays = (expireDate) => {
        const today = new Date();
        const dueDate = new Date(expireDate);
        const timeDifference = dueDate.getTime() - today.getTime();
        const diffDays = Math.ceil(timeDifference / (1000 * 3600 * 24));
        const diffHours = Math.ceil(timeDifference / (1000 * 3600)) + 9;
        if (diffDays === 0) {
            return <span style={{ color: `${Math.abs(diffDays) > 1 ? '' : 'red'}`, fontWeight: "bold" }}>{diffHours} hours</span>;
        } else if (diffDays > 0) {
            return <span style={{ color: `${Math.abs(diffDays) > 7 ? '' : 'red'}` }}>{diffDays} days</span>
        }
    };

    const openCompletedQuote = (productId) => {
        window.open(`/product-details/${productId}`, '_blank');
    }


    const [showCartMessage, setShowCartMessage] = useState(false);
    const [buttonText, setButtonText] = useState(<span>Add to cart <i className="bi bi-minecart-loaded"></i></span>);
    const [buttonStates, setButtonStates] = useState({});
    const dispatch = useDispatch();


    const addToCartHandler = async (productId, qty, productStock, quoteId) => {
        setButtonStates(prevState => ({ ...prevState, [quoteId]: "Adding..." }));

        try {
            await dispatch(addToCart(productId, qty, productStock));
            setButtonStates(prevState => ({ ...prevState, [quoteId]: "Added!" }));
            setTimeout(() => setButtonStates(prevState => ({ ...prevState, [quoteId]: <span>Add to cart <i className="bi bi-minecart-loaded"></i></span> })), 1000);
        } catch (error) {
            setButtonStates(prevState => ({ ...prevState, [quoteId]: <span>Add to cart <i className="bi bi-minecart-loaded"></i></span> }));
        }
    };

    const columnWidths = ["4%", "10", "50%", "8%", "8%", "10%", "10%"];


    return (
        <>

            <table className="table table-striped">
                <TableHeader
                    headers={completedHeaders}
                    onSorting={(field, order) => setSorting({ field, order })}
                    widths={columnWidths}
                />
                 {quotes.length === 0 && <div className="fs-3 ms-2" >No Quotes</div>}
                <tbody>
                    {quoteItems.requestedQuotes?.map((quoteItem, idx) => (
                        <tr key={"requestedQuotes" + idx} >
                            <td>{idx + 1} </td>
                            <td>{quoteItem.name}</td>
                            <td className="clickable" onClick={() => openCompletedQuote(quoteItem.product?._id)}>{quoteItem.product?.name}</td>
                            <td>
                                {quoteItem.product && quoteItem.product.displayPrice && quoteItem.product.displayPrice !== 0 ? `$ ${quoteItem.product.stock[0].price.toFixed(2)}` : ""}
                            </td>
                            <td style={{ color: "#1e4881", fontWeight: 'bold' }}>Archived</td>
                            {/* once status is completed, change to counting down of expire Data */}
                            <td>{calculateDueInDays(quoteItem.expireDate)}</td>
                            <td>
                            <button
                                    className="btn-sm btn-light w-100"
                                        style={{
                                            border: "1px solid #1e4881",
                                            borderRadius: "5px",
                                            color: "#1e4881",
                                        }}
                                    onClick={() => addToCartHandler(quoteItem.product._id, 1, quoteItem.product.stock[0], quoteItem._id)}
                                >
                                    {buttonStates[quoteItem._id] || <span>Re-order <i className="bi bi-minecart-loaded"></i></span>}
                                </button>
                            </td>

                        </tr>
                    ))}
                </tbody>
            </table>
            <Pagination
                total={totalItems}
                itemsPerPage={ITEMS_PER_PAGE}
                currentPage={currentPage}
                onPageChange={(page) => setCurrentPage(page)}
            />
        </>
    );
};

export default RequestedQuotesTable;
