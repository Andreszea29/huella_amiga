-- OPCIONAL: los archivos PHP ya crean estas columnas solos si no existen.
-- Ejecútalo solo si prefieres hacerlo a mano en phpMyAdmin.
ALTER TABLE mascotas
  ADD COLUMN imagen VARCHAR(255) NULL,
  ADD COLUMN estado VARCHAR(15) NOT NULL DEFAULT 'disponible';
