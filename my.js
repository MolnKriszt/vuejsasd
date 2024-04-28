const { createApp } = Vue

createApp({
    data() {
        return {
            valami: "asd",
            currencies: [
                {
                    "name": "USA Dollár",
                    "symbol": "$",
                    "label": "USD"
                },
                {
                    "name": "Magyar Forint",
                    "symbol": "Ft",
                    "label": "HUF"
                },
                {
                    "name": "Euró",
                    "symbol": "€",
                    "label": "EUR"
                },
                {
                    "name": "Orosz Rubel",
                    "symbol": "₽",
                    "label": "RUB"
                }
            ],
            currentCurrency: [],
            value: 1,
            total: null,
            from: "EUR",
            to: "HUF",
            key: "fca_live_MXdMjuapjhRbAJ0K2XtMuhj45eD5ULyMr7a7mHnf",
        }
    },
    async mounted() {
        await this.GetCurrentCurrencies();
        await this.onClickchange();
    },
    methods: {
        async GetCurrentCurrencies() {
            const response = await fetch(this.url);
            const data = await response.json();
            this.currentCurrency = data.data;
        },
        async onClickchange(){
            await this.GetCurrentCurrencies();
            this.total = this.currentCurrency[this.to] * this.value;
        }
    },
    computed: {
        url() {
            return `https://api.freecurrencyapi.com/v1/latest?apikey=${this.key}&currencies=${this.label}&base_currency=${this.from}`;
        },
        label(){
            return this.currencies.map((currency) => currency.label).join("%2C");
        }
    }
}).mount('#app')