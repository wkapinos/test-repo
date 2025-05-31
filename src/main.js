import './style.css';

const supabaseUrl = 'https://wpfanzxyqjyvhcqmdshx.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndwZmFuenh5cWp5dmhjcW1kc2h4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc2NjU1MjAsImV4cCI6MjA2MzI0MTUyMH0.9tSxGFxw52Xkmqq-7FxSLAN0_I3eBkec4mfEG5RffL4';

async function fetchArticles() {
    try {
        const response = await fetch(`${supabaseUrl}/rest/v1/Articles`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'apikey': supabaseAnonKey
            }
        });

        if (!response.ok) {
            // Jeśli status nie jest 2xx, spróbujmy odczytać szczegóły błędu z odpowiedzi
            const errorData = await response.json(); // Próba odczytania JSON z błędem
            console.error('Błąd HTTP podczas pobierania artykułów:', response.status, response.statusText, errorData);
            throw new Error(`Błąd pobierania danych: ${response.statusText || 'Nieznany błąd'}`);
        }

        const data = await response.json();
        return data;

    } catch (error) {
        console.error('Wystąpił błąd podczas wykonywania zapytania:', error);
        return null;
    }
}


const articles = await fetchArticles();

let table= '<table class="table table-striped table-bordered">';

table += '<tr><th>Title</th><th>Cos tam</th></tr>';

articles.forEach(article => {
    table += `<tr><td>${article.title}</td><td>${article.subtitle}</td></tr>`;
})

table += '</table>';


document.querySelector('#app').innerHTML = `
  <h1>Hello Vite!</h1>
  ${table}
`;
