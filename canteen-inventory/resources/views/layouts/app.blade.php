<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="https://cdn.tailwindcss.com"></script>
    <title>School Canteen | Inventory</title>
</head>
<body class="bg-orange-50 h-screen flex text-stone-900 overflow-hidden">

    <nav class="w-64 flex-shrink-0 bg-amber-950 text-stone-200 flex flex-col p-6 shadow-xl overflow-y-auto">
        <h1 class="text-2xl font-bold text-white mb-10 tracking-tight">School Canteen</h1>
        
        <div class="space-y-4">
            <p class="text-[10px] uppercase text-stone-500 font-bold tracking-widest px-3">Modules</p>
            
            <a href="{{ route('dashboard') }}" class="flex items-center space-x-3 p-3 rounded-lg {{ request()->routeIs('dashboard') ? 'bg-amber-800 text-white' : 'hover:bg-amber-900' }}">
                <span>Dashboard</span>
            </a>
            
            <a href="{{ route('products.index') }}" class="flex items-center space-x-3 p-3 rounded-lg {{ request()->routeIs('products*') ? 'bg-amber-800 text-white' : 'hover:bg-amber-900' }}">
                <span>Products</span>
            </a>
            
            <a href="{{ route('suppliers.index') }}" class="flex items-center space-x-3 p-3 rounded-lg {{ request()->routeIs('suppliers*') ? 'bg-amber-800 text-white' : 'hover:bg-amber-900' }}">
                <span>Suppliers</span>
            </a>
        </div>
    </nav>

    <main class="flex-1 overflow-y-auto bg-stone-50">
        @yield('content')
    </main>
    
    @include('partials.flash')

</body>
</html>