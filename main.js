const potatoInput = document.getElementById('potato-input');
const butterEl = document.getElementById('butter');
const milkEl = document.getElementById('milk');
const onionEl = document.getElementById('onion');
const garlicEl = document.getElementById('garlic');
const saltEl = document.getElementById('salt');
const pepperEl = document.getElementById('pepper');

// Base recipe per 100g
const ratios = {
    butter: 7 / 100,
    milk: 15 / 100,
    onion: 1 / 100,
    garlic: 0.5 / 100,
    salt: 1 / 100,
    pepper: 0.2 / 100
};

potatoInput.addEventListener('input', (e) => {
    const amount = parseFloat(e.target.value) || 0;

    updateIngredient(butterEl, amount * ratios.butter);
    updateIngredient(milkEl, amount * ratios.milk);
    updateIngredient(onionEl, amount * ratios.onion);
    updateIngredient(garlicEl, amount * ratios.garlic);
    updateIngredient(saltEl, amount * ratios.salt);
    updateIngredient(pepperEl, amount * ratios.pepper);
});

function updateIngredient(element, value) {
    if (value === 0) {
        element.innerHTML = `0<span class="unit">g</span>`;
        return;
    }

    // Format: if integer show as is, if decimal show up to 2 places
    const formatted = Number.isInteger(value) ? value : value.toFixed(2).replace(/\.?0+$/, '');
    element.innerHTML = `${formatted}<span class="unit">g</span>`;

    // Tiny bounce animation on change
    element.style.transform = 'scale(1.1)';
    setTimeout(() => {
        element.style.transform = 'scale(1)';
    }, 100);
}

// Focus input on load
window.addEventListener('load', () => {
    potatoInput.focus();
});

// Copy functionality
const copyBtn = document.getElementById('copy-btn');
copyBtn.addEventListener('click', () => {
    const amount = potatoInput.value || 0;
    if (amount <= 0) return;

    const text = `
Patates Püresi Tarifi (${amount}g Patates için):
----------------------------------
- Tereyağı: ${butterEl.textContent}
- Ilık Süt: ${milkEl.textContent}
- Soğan Tozu: ${onionEl.textContent}
- Sarımsak Tozu: ${garlicEl.textContent}
- Tuz: ${saltEl.textContent}
- Karabiber: ${pepperEl.textContent}
----------------------------------
Afiyet olsun!
    `.trim();

    navigator.clipboard.writeText(text).then(() => {
        const originalText = copyBtn.innerText;
        copyBtn.innerText = 'Kopyalandı! ✓';
        copyBtn.classList.add('success');

        setTimeout(() => {
            copyBtn.innerText = originalText;
            copyBtn.classList.remove('success');
        }, 2000);
    });
});
