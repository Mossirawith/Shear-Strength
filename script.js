
    function updateShearStrength() {
      const shear = document.getElementById('specmat').value;
      document.getElementById('shear').value = shear;
    }
 
    function calculateForce(base) {
      const thickness = parseFloat(document.getElementById('thickness').value) || 0;
      const shear = parseFloat(document.getElementById('shear').value) || 0;
      if (!shear || !thickness || base === 0) {
        document.getElementById('result').innerHTML = "<p class='text-red-400'>Please fill in all required fields.</p>";
        return;
      }
 
      const result = base * thickness * shear / 1000;
      const releaseForce = result * 0.1;
      const loadDensity = result * 0.4;
      const totalForce = result + releaseForce + loadDensity;
 
      document.getElementById('result').innerHTML = `
        <p>Base Result: <strong>${result.toFixed(2)} Ton</strong></p>
        <p>Release Force (10%): <strong>${releaseForce.toFixed(2)} Ton</strong></p>
        <p>Load Density (40%): <strong>${loadDensity.toFixed(2)} Ton</strong></p>
        <p class="text-xl text-blue-300 mt-2">Total Machine Force: <strong>${totalForce.toFixed(2)} Ton</strong></p>
      `;
 
      const ctx = document.getElementById('forceChart').getContext('2d');
      document.getElementById('forceChart').classList.remove('hidden');
      if (window.myChart) window.myChart.destroy();
      window.myChart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['Result', 'Release', 'Load', 'Total'],
          datasets: [{
            label: 'Force (Ton)',
            data: [result, releaseForce, loadDensity, totalForce],
            backgroundColor: ['#3b82f6', '#facc15', '#10b981', '#8b5cf6']
          }]
        },
        options: {
          responsive: true,
          plugins: {
            legend: { display: false },
            tooltip: { mode: 'index', intersect: false }
          },
          scales: {
            y: { beginAtZero: true }
          }
        }
      });
    }
 
    function calculateFromFormula() {
      const inputs = document.querySelectorAll('#input-group input');
      let sum = 0;
      let diameters = 0;
      let radii = 0;
      inputs.forEach(input => {
        const val = parseFloat(input.value) || 0;
        if (input.classList.contains('diameter-input')) {
          diameters += Math.PI * val;
        } else if (input.classList.contains('radius-input')) {
          radii += (Math.PI * val) / 2;
        } else {
          sum += val;
        }
      });
      const base = sum + diameters + radii;
      calculateForce(base);
    }
 
    function calculateFromPerimeter() {
      const perimeter = parseFloat(document.getElementById('perimeter').value) || 0;
      calculateForce(perimeter);
    }
 
    function addMoreInputs() {
      const container = document.getElementById('input-group');
      const input = document.createElement('input');
      input.type = 'number';
      input.placeholder = 'Length (mm)';
      input.className = 'p-2 bg-gray-700 rounded text-white';
      container.insertBefore(input, container.querySelector('.diameter-input') || container.querySelector('.radius-input') || null);
    }
 
    function addMoreDiameters() {
      const container = document.getElementById('input-group');
      const input = document.createElement('input');
      input.type = 'number';
      input.placeholder = 'Diameter (mm)';
      input.className = 'p-2 bg-gray-700 rounded text-white diameter-input col-span-2';
      container.appendChild(input);
    }
 
    function addMoreRadii() {
      const container = document.getElementById('input-group');
      const input = document.createElement('input');
      input.type = 'number';
      input.placeholder = 'Radius (mm)';
      input.className = 'p-2 bg-gray-700 rounded text-white radius-input col-span-2';
      container.appendChild(input);
    }
    function createInputWithDelete(className, placeholder) {
  const container = document.createElement('div');
  container.className = 'relative flex';

  const input = document.createElement('input');
  input.type = 'number';
  input.placeholder = placeholder;
  input.className = `p-2 bg-gray-700 rounded text-white flex-grow ${className}`;

  const button = document.createElement('button');
  button.type = 'button';
  button.textContent = '✕';
  button.className = 'ml-2 text-red-400 hover:text-red-600 font-bold';
  button.onclick = () => container.remove();

  container.appendChild(input);
  container.appendChild(button);
  return container;
}

function addMoreInputs() {
  const container = document.getElementById('input-group');
  const inputWrapper = createInputWithDelete('', 'Length (mm)');
  container.appendChild(inputWrapper);
}

function addMoreDiameters() {
  const container = document.getElementById('input-group');
  const inputWrapper = createInputWithDelete('diameter-input', 'Diameter (mm)');
  container.appendChild(inputWrapper);
}

function addMoreRadii() {
  const container = document.getElementById('input-group');
  const inputWrapper = createInputWithDelete('radius-input', 'Radius (mm)');
  container.appendChild(inputWrapper);
}
function clearAllInputs() {
  // ล้างช่อง input-group ทั้งหมด
  document.getElementById('input-group').innerHTML = '';

  // ล้าง perimeter
  document.getElementById('perimeter').value = '';

  // ล้าง thickness
  document.getElementById('thickness').value = '';

  // ล้าง shear
  document.getElementById('shear').value = '';

  // Reset dropdown
  document.getElementById('specmat').selectedIndex = 0;

  // ล้างผลลัพธ์
  document.getElementById('result').innerHTML = '';
  document.getElementById('forceChart').classList.add('hidden');
}
  