<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>POS system</title>
        <!-- Fonts -->
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Poppins:300,400,500,600,700"/>
        <style>
            html, body {
                min-height: 100%;
            }

            body {
                margin: 0;
                background: #f4f6f9;
                color: #111827;
                font-family: "Poppins", sans-serif;
            }

            #root {
                min-height: 100vh;
            }

            .pos-startup-loader {
                min-height: 100vh;
                display: flex;
                align-items: center;
                justify-content: center;
                padding: 2rem;
                background:
                    radial-gradient(circle at top right, rgba(13, 110, 253, 0.1), transparent 32%),
                    linear-gradient(180deg, #f4f6f9 0%, #eef2f7 100%);
            }

            .pos-startup-loader__panel {
                width: min(30rem, 100%);
                padding: 2rem;
                border-radius: 1.5rem;
                background: rgba(255, 255, 255, 0.92);
                border: 1px solid rgba(15, 23, 42, 0.08);
                box-shadow: 0 24px 60px rgba(15, 23, 42, 0.12);
            }

            .pos-startup-loader__top {
                display: flex;
                align-items: center;
                gap: 1rem;
                margin-bottom: 1.5rem;
            }

            .pos-startup-loader__spinner {
                width: 3rem;
                height: 3rem;
                border-radius: 999px;
                border: 3px solid rgba(13, 110, 253, 0.18);
                border-top-color: #0d6efd;
                animation: posStartupSpin 0.8s linear infinite;
                flex-shrink: 0;
            }

            .pos-startup-loader__brand {
                display: block;
                font-size: 1.1rem;
                font-weight: 600;
                letter-spacing: 0.01em;
            }

            .pos-startup-loader__line {
                display: block;
                height: 0.8rem;
                border-radius: 999px;
                margin-top: 0.85rem;
                background: linear-gradient(90deg, rgba(13, 110, 253, 0.1), rgba(13, 110, 253, 0.22), rgba(13, 110, 253, 0.1));
                background-size: 200% 100%;
                animation: posStartupPulse 1.4s ease-in-out infinite;
            }

            .pos-startup-loader__line--wide {
                width: 100%;
            }

            .pos-startup-loader__line--medium {
                width: 76%;
            }

            .pos-startup-loader__line--short {
                width: 52%;
            }

            @keyframes posStartupSpin {
                to {
                    transform: rotate(360deg);
                }
            }

            @keyframes posStartupPulse {
                0% {
                    background-position: 0 50%;
                    opacity: 0.65;
                }

                50% {
                    background-position: 100% 50%;
                    opacity: 1;
                }

                100% {
                    background-position: 0 50%;
                    opacity: 0.65;
                }
            }
        </style>
    </head>
    <body class="antialiased">
    <div id="root">
        <div class="pos-startup-loader" role="status" aria-live="polite" aria-busy="true">
            <div class="pos-startup-loader__panel">
                <div class="pos-startup-loader__top">
                    <div class="pos-startup-loader__spinner"></div>
                    <strong class="pos-startup-loader__brand">InventaPro POS</strong>
                </div>
                <span class="pos-startup-loader__line pos-startup-loader__line--wide"></span>
                <span class="pos-startup-loader__line pos-startup-loader__line--medium"></span>
                <span class="pos-startup-loader__line pos-startup-loader__line--short"></span>
            </div>
        </div>
    </div>
    </body>
<script type="text/javascript" src="{{ mix('js/app.js') }}"></script>
</html>
