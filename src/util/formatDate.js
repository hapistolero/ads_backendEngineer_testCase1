const formatDate = (dateString) => {
  const date = new Date(dateString)
    
  // Extracting individual components
  const day = date.getDate().toString().padStart(2, '0')
  const month = new Intl.DateTimeFormat('en-GB', { month: 'short' }).format(date)
  const year = date.getFullYear().toString().slice(-2) // Get the last two digits

  return `${day}-${month}-${year}`
}

module.exports = {formatDate}