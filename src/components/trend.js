exports.trendsToText = function(number) {
    switch (number) {
        case 0:
            return "None";
        case 1:
            return '<i className="fa fa-arrow-up"/><i className="fa fa-arrow-up"/>';
        case 2:
            return '<i className="fa fa-arrow-up"/>';
        case 3:
            return '<i className="fa fa-arrow-up fa-rotate-315"/>';
        case 4:
            return '<i className="fa fa-arrow-right"/>';
        case 5:
            return '<i className="fa fa-arrow-up fa-rotate-45"/>';
        case 6:
            return '<i className="fa fa-arrow-down"/>';
        case 7:
            return '<i className="fa fa-arrow-down"/><i className="fa fa-arrow-down"/>';
        case 8:
            return "Cannot compute";
        case 9:
            return "Rate out of Range";
    }
    return "Well, I am flumoxxed";
};
