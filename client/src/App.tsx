// Simple test to isolate the issue
function App() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Applifique</h1>
        <p className="text-gray-600 mb-8">Testing React App Load</p>
        <form 
          action="https://assets.mailerlite.com/jsonp/1711800/forms/109434002103779154/subscribe" 
          method="post"
          target="_blank"
          className="space-y-4 max-w-md mx-auto"
        >
          <input 
            type="email" 
            name="fields[email]"
            placeholder="Enter your email address"
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
            required
          />
          <input type="hidden" name="ml-submit" value="1" />
          <button 
            type="submit"
            className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            Join Waitlist
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;
