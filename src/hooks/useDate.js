const useDate = (dateInMilliseconds) => {
    let date = new Date(dateInMilliseconds)
        .toString()
        .substring(0, 24);

    return date;
};

export default useDate;