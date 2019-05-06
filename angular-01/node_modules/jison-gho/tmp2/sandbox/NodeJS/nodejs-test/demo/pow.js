(function() {
    function pow(x, n) {
        if(n<=0) {
            return 1;
        }

        var result = x * pow(x, n-1);
        return result;
    }

    console.log( pow(2, 3) );

})();