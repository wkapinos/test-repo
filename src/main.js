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
            const errorData = await response.json();
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

async function createArticle(articleData) {
    try {
        const response = await fetch(`${supabaseUrl}/rest/v1/Articles`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'apikey': supabaseAnonKey,
                'Prefer': 'return=minimal'
            },
            body: JSON.stringify(articleData)
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error('Błąd podczas tworzenia artykułu:', response.status, response.statusText, errorData);
            throw new Error(`Błąd tworzenia artykułu: ${response.statusText || 'Nieznany błąd'}`);
        }

        return true;

    } catch (error) {
        console.error('Wystąpił błąd podczas tworzenia artykułu:', error);
        throw error;
    }
}

function displayArticles(articles) {
    let table = '<table class="table table-striped table-bordered">';
    
    table += '<tr>' +
        '<th>Tytuł</th>' +
        '<th>Podtytuł</th>' +
        '<th>Autor</th>' +
        '<th>Data utworzenia</th>' +
        '<th>Treść</th></tr>';

    articles.forEach(article => {
        const createdAt = new Date(article.created_at).toLocaleDateString('pl-PL');
        table += `<tr>
            <td>${article.title}</td>
            <td>${article.subtitle}</td>
            <td>${article.author}</td>
            <td>${createdAt}</td>
            <td>${article.content}</td>
        </tr>`;
    });

    table += '</table>';
    return table;
}

function createForm() {
    return `
        <div class="form-container">
            <h2>Dodaj nowy artykuł</h2>
            <form id="articleForm">
                <div class="form-group">
                    <label for="title">Tytuł:</label>
                    <input type="text" id="title" name="title" required>
                </div>
                
                <div class="form-group">
                    <label for="subtitle">Podtytuł:</label>
                    <input type="text" id="subtitle" name="subtitle" required>
                </div>
                
                <div class="form-group">
                    <label for="author">Autor:</label>
                    <input type="text" id="author" name="author" required>
                </div>
                
                <div class="form-group">
                    <label for="content">Treść:</label>
                    <textarea id="content" name="content" rows="5" required></textarea>
                </div>
                
                <button type="submit" class="submit-btn">Dodaj artykuł</button>
            </form>
            <div id="message"></div>
        </div>
    `;
}

async function handleFormSubmit(event) {
    event.preventDefault();
    
    const form = event.target;
    const formData = new FormData(form);
    const messageDiv = document.getElementById('message');
    
    const articleData = {
        title: formData.get('title'),
        subtitle: formData.get('subtitle'),
        author: formData.get('author'),
        content: formData.get('content')
    };
    
    try {
        messageDiv.innerHTML = '<p class="loading">Dodawanie artykułu...</p>';
        
        await createArticle(articleData);
        
        messageDiv.innerHTML = '<p class="success">Artykuł został dodany pomyślnie!</p>';
        form.reset();
        
        // Odśwież listę artykułów
        setTimeout(async () => {
            await refreshArticles();
            messageDiv.innerHTML = '';
        }, 2000);
        
    } catch (error) {
        messageDiv.innerHTML = `<p class="error">Błąd: ${error.message}</p>`;
    }
}

async function refreshArticles() {
    const articles = await fetchArticles();
    if (articles) {
        const tableHTML = displayArticles(articles);
        document.querySelector('#articles-container').innerHTML = tableHTML;
    }
}

async function initializeApp() {
    const articles = await fetchArticles();

    if (articles) {
        const tableHTML = displayArticles(articles);
        const formHTML = createForm();
        
        document.querySelector('#app').innerHTML = `
            <div id="articles-container">${tableHTML}</div>
            ${formHTML}
        `;
        
        // Dodaj event listener do formularza
        document.getElementById('articleForm').addEventListener('submit', handleFormSubmit);
    } else {
        document.querySelector('#app').innerHTML = '<p>Błąd podczas ładowania artykułów.</p>';
    }
}

initializeApp();