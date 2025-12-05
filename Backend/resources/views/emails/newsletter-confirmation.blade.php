<style>
        .container {
            max-width: 480px;
            margin: 40px auto;
            background: #ffffff;
            border-radius: 12px;
            padding: 30px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.08);
            text-align: center;
        }

        h2 {
            color: #2d2d2d;
            margin-bottom: 15px;
        }

        p {
            color: #555555;
            line-height: 1.6;
            margin-bottom: 20px;
            font-size: 15px;
        }

        a {
            display: inline-block;
            background-color: #4a90e2;
            color: white !important;
            padding: 12px 20px;
            border-radius: 6px;
            text-decoration: none;
            font-weight: 600;
            font-size: 15px;
        }

        a:hover {
            background-color: #3d7bc2;
        }

</style>
<body>
<div class="container">

<h2>Confirmez votre abonnement</h2>
<p>Bonjour, merci pour votre abonnement à notre newsletter !</p>
<p>Cliquez sur le lien ci-dessous pour confirmer :</p>
<a href="{{ url('/api/newsletter/confirm?token='.$token) }}">
    Confirmer mon abonnement
</a>

</div>
</body>
