const API_URL = 'http://localhost:3000';

const inputProblem = document.getElementById('inputProblem');
const btnSearch = document.getElementById('btnSearch');
const resultDiv = document.getElementById('result');

const addSection = document.getElementById('addSolutionSection');
const newProblemInput = document.getElementById('newProblem');
const newSolutionInput = document.getElementById('newSolution');
const newKeywordsInput = document.getElementById('newKeywords');
const btnAddSolution = document.getElementById('btnAddSolution');
const addMessage = document.getElementById('addMessage');

btnSearch.addEventListener('click', async () => {
    const query = inputProblem.value.trim();
    resultDiv.innerHTML = '';
    addSection.style.display = 'none';
    addMessage.textContent = '';

    if (!query) {
        alert('Digite um problema para buscar.');
        return;
    }

    try {
        const res = await fetch(`${API_URL}/solutions/search?q=${encodeURIComponent(query)}`);
        const data = await res.json();

        if (data.length === 0) {
            resultDiv.innerHTML = '<p>Nenhuma solução encontrada.</p>';
            addSection.style.display = 'block';
            newProblemInput.value = query;
            newSolutionInput.value = '';
            newKeywordsInput.value = '';
        } else {
            resultDiv.innerHTML = '<h3>Soluções encontradas:</h3>';
            data.forEach(item => {
                const div = document.createElement('div');
                div.innerHTML = `<strong>Problema:</strong> ${item.problem}<br/><strong>Solução:</strong> ${item.solution}`;
                div.style.marginBottom = '10px';
                resultDiv.appendChild(div);
            });
        }
    } catch (error) {
        console.error(error);
        alert('Erro ao buscar soluções.');
    }
});

btnAddSolution.addEventListener('click', async () => {
    const problem = newProblemInput.value.trim();
    const solution = newSolutionInput.value.trim();
    const keywords = newKeywordsInput.value.split(',').map(k => k.trim()).filter(k => k);

    if (!problem || !solution) {
        alert('Preencha o problema e a solução para salvar.');
        return;
    }

    try {
        const res = await fetch(`${API_URL}/solutions`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ problem, solution, keywords }),
        });

        if (res.ok) {
            addMessage.textContent = 'Solução salva com sucesso!';
            addSection.style.display = 'none';
            inputProblem.value = '';
            resultDiv.innerHTML = '';
        } else {
            const err = await res.json();
            addMessage.textContent = 'Erro: ' + (err.message || 'Falha ao salvar');
        }
    } catch (error) {
        console.error(error);
        addMessage.textContent = 'Erro ao salvar solução.';
    }
});
