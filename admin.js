const SUPABASE_URL = "https://uanfnhqulovxoltdeqal.supabase.co/rest/v1/reviews"; 
const SUPABASE_ANON_KEY = "sb_publishable_TE3UFs5E6Ctg5IUClHeHmw_Mexcm-kj"; 

// 1. Simple Security Gate
const SECRET_PIN = "1234"; 

function checkPin() {
  const enteredPin = document.getElementById('pinCode').value;
  if (enteredPin === SECRET_PIN) {
    document.getElementById('securityScreen').style.display = 'none';
    document.getElementById('dashboard').style.display = 'block';
    fetchAdminReviews(); 
  } else {
    alert("Incorrect PIN. Access Denied.");
    document.getElementById('pinCode').value = '';
  }
}

document.getElementById('pinCode').addEventListener('keypress', function (e) {
  if (e.key === 'Enter') checkPin();
});

// 2. Fetch All Reviews
async function fetchAdminReviews() {
  const tableBody = document.getElementById('adminTableBody');
  tableBody.innerHTML = '<tr><td colspan="5" style="text-align: center;">Loading database...</td></tr>';

  try {
    const response = await fetch(`${SUPABASE_URL}?select=*&order=created_at.desc`, {
      headers: {
        'apikey': SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`
      }
    });

    const reviews = await response.json();
    tableBody.innerHTML = '';

    if (reviews.length === 0) {
      tableBody.innerHTML = '<tr><td colspan="5" style="text-align: center;">No reviews in the database.</td></tr>';
      return;
    }

    reviews.forEach(review => {
      const dateStr = review.created_at ? new Date(review.created_at).toLocaleDateString() : "-";
      
      const row = `
        <tr>
          <td style="color: var(--text-secondary);">${dateStr}</td>
          <td><strong>${review.name || "Anonymous"}</strong></td>
          <td style="color: #fbbf24;">${'★'.repeat(review.rating || 5)}</td>
          <td style="max-width: 300px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${review.message || "-"}</td>
          <td>
            <button class="delete-btn" onclick="deleteReview('${review.id}')">Delete</button>
          </td>
        </tr>
      `;
      tableBody.innerHTML += row;
    });

  } catch (error) {
    console.error("Fetch Error:", error);
    tableBody.innerHTML = '<tr><td colspan="5" style="text-align: center; color: #ff4757;">Connection Error. Check console.</td></tr>';
  }
}

// 3. Delete a Review
async function deleteReview(reviewId) {
  if (!confirm("Are you sure you want to permanently delete this review?")) return;

  try {
    const response = await fetch(`${SUPABASE_URL}?id=eq.${reviewId}`, {
      method: 'DELETE',
      headers: {
        'apikey': SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`
      }
    });

    if (response.ok) {
      fetchAdminReviews();
    } else {
      throw new Error("Could not delete");
    }
  } catch (error) {
    alert("Error deleting review. See console.");
    console.error(error);
  }
}