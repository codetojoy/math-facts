function MathFactsViewModel() {
    var self = this;

    self.input = ko.observable("");
    self.hasResult = ko.observable(false);
    self.resultText = ko.observable("");
    self.error = ko.observable("");

    self.canSubmit = ko.pureComputed(function () {
        return self.input() !== "" && !isNaN(parseInt(self.input(), 10));
    });

    self.submit = function () {
        self.error("");
        self.hasResult(false);

        var n = parseInt(self.input(), 10);
        if (isNaN(n)) {
            self.error("Please enter a valid integer.");
            return;
        }

        $.getJSON("/api/mathfacts", { n: n })
            .done(function (data) {
                var msg = data.prime
                    ? data.n + " is prime."
                    : data.n + " is not prime.";
                self.resultText(msg);
                self.hasResult(true);
            })
            .fail(function () {
                self.error("Request failed. Please try again.");
            });
    };
}

$(function () {
    ko.applyBindings(new MathFactsViewModel());
});
